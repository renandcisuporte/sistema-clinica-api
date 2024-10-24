import { AppError } from '@/common/app.error'
import { Chart } from '@/domain/entities/chart'
import { ChartRepository } from '@/domain/inferfaces/repositories/chart-repository'
import { daysOfWeekOrder } from '@/shared/contants'
import { calculateTotalHours } from '@/shared/utils'
import { PrismaClient } from '@prisma/client'

export class ChartRepositoryImp implements ChartRepository {
  constructor(protected readonly db: PrismaClient) {}

  private mergeResults(
    arr1: Record<string, any>, // workTimeResponse
    arr2: Record<string, any>, // workTimeRecommendResponse
    arr3: Record<string, any> // workTimeServiceResponse
  ): Chart[] {
    const mergedResult: Chart[] = []

    // Obter todas as chaves de clinics, removendo duplicatas
    const allClinicIds = Array.from(
      new Set([
        ...Object.keys(arr1),
        ...Object.keys(arr2),
        ...Object.keys(arr3)
      ])
    )

    // Iterar sobre todos os clinicIds
    allClinicIds.forEach((clinicId) => {
      const workTime = arr1[clinicId]?.workTime || []
      const workTimeRecommend = arr2[clinicId]?.workTimeRecommend || []
      const workTimeService = arr3[clinicId]?.workTimeService || []

      const combined = [...workTime, ...workTimeRecommend, ...workTimeService]

      // Agrupamento utilizando Map para otimizar buscas
      const groupCombined = combined.reduce((acc: Map<string, any>, curr) => {
        // Se já existe uma entrada para a fantasia, continuamos, caso contrário, criamos uma nova
        if (!acc.has(curr.fantasy)) {
          acc.set(curr.fantasy, {
            fantasy: curr.fantasy,
            title: curr.title,
            workHours: []
          })
        }

        const fantasyEntry = acc.get(curr.fantasy)

        // Verificar se já existe uma entrada para a semana dentro da fantasia
        let weekEntry = fantasyEntry.workHours.find(
          (hour: { week: string }) => hour.week === curr.week
        )

        if (!weekEntry) {
          // Criar uma nova entrada para a semana, se não existir
          weekEntry = {
            week: curr.week,
            workTime: 0,
            workTimeRecommend: 0,
            workTimeService: 0
          }
          fantasyEntry.workHours.push(weekEntry)
        }

        // Mesclar os dados com base na semana
        weekEntry.workTime = curr.workTime || weekEntry.workTime
        weekEntry.workTimeRecommend =
          curr.workTimeRecommend || weekEntry.workTimeRecommend
        weekEntry.workTimeService =
          curr.workTimeService || weekEntry.workTimeService

        return acc
      }, new Map())

      // Converter Map para array, ordenar as semanas e adicionar ao resultado final
      const groupedArray: Record<string, any>[] = Array.from(
        groupCombined.values()
      )

      groupedArray.forEach((item) => {
        item.workHours.sort((a: { week: string }, b: { week: string }) => {
          const dayA = daysOfWeekOrder.indexOf(a.week)
          const dayB = daysOfWeekOrder.indexOf(b.week)
          return dayA - dayB
        })
      })

      mergedResult.push(...(groupedArray as Chart[]))
    })

    return mergedResult
  }

  private async fetchChart(
    clinicId: string,
    table: 'workTime' | 'workTimeRecommend' | 'workTimeService'
  ) {
    try {
      return (
        await (this.db[table] as any).findMany({
          where: { clinic: { id: clinicId } },
          include: { clinic: true },
          orderBy: { createdAt: 'desc' }
        })
      ).reduce(
        (
          acc: Record<string, any>,
          {
            createdAt,
            updatedAt,
            deletedAt,
            clinicId,
            clinic,
            times,
            open,
            id,
            ...rest
          }: any
        ) => {
          const { fantasy, title } = clinic!
          const sumHours = calculateTotalHours(JSON.parse(times), !open)

          if (!acc[clinicId]) acc[clinicId] = { title, fantasy, [table]: [] }

          acc[clinicId][table].push({
            ...rest,
            title,
            fantasy,
            [table]: sumHours
          })

          return acc
        },
        {}
      )
    } catch (error) {
      throw new AppError(String(error))
    }
  }

  async chart(clinicId: string): Promise<Chart[]> {
    try {
      const workTimeResult = await this.fetchChart(clinicId, 'workTime')

      const workTimeRecommendResult = await this.fetchChart(
        clinicId,
        'workTimeRecommend'
      )

      const workTimeServiceResult = await this.fetchChart(
        clinicId,
        'workTimeService'
      )

      const mergedData = this.mergeResults(
        workTimeResult,
        workTimeRecommendResult,
        workTimeServiceResult
      )

      return Object.values(mergedData)
    } catch (error) {
      throw new AppError(String(error))
    }
  }
}
