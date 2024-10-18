import { daysOfWeekOrder } from '@/contants'
import { ChartsInterface } from '@/entities/charts'
import { ChartRepositoryInterface } from '@/repositories/char.interface'
import { calculateTotalHours } from '@/utils'
import { PrismaClient } from '@prisma/client'

export class ChartRepository implements ChartRepositoryInterface {
  constructor(protected readonly db: PrismaClient) {}

  mergeResults(
    workTimeResponse: Record<string, any>,
    workTimeRecommendResponse: Record<string, any>
  ) {
    const mergedResult = { ...workTimeResponse }

    Object.keys(workTimeRecommendResponse).forEach((clinicId) => {
      if (!mergedResult[clinicId]) {
        // Se o clinicId ainda não existir em mergedResult, adicione-o diretamente
        mergedResult[clinicId] = {
          ...workTimeRecommendResponse[clinicId],
          workHours: workTimeRecommendResponse[clinicId].workHourRecommends.map(
            (recommendItem: any) => ({
              week: recommendItem.week,
              workHours: 0, // Nenhum valor de workHours, só recommended
              workHoursRecommended: recommendItem.workHourRecommends
            })
          )
        }
      } else {
        // Se o clinicId já existir, mescle os dados
        mergedResult[clinicId].workHours = mergedResult[clinicId].workHours.map(
          (workItem: any) => {
            const recommendItem = workTimeRecommendResponse[
              clinicId
            ].workHourRecommends.find(
              (recommend: any) => recommend.week === workItem.week
            )

            return {
              ...workItem,
              workHoursRecommended: recommendItem
                ? recommendItem.workHourRecommends
                : 0
            }
          }
        )
      }
    })

    return mergedResult
  }

  async chart(userId: string): Promise<ChartsInterface[]> {
    const workTimeResult = (
      await this.db.workTime.findMany({
        where: {
          clinic: {
            userId
          }
        },
        include: {
          clinic: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    ).reduce(
      (
        acc: Record<string, any>,
        {
          id,
          deletedAt,
          updatedAt,
          createdAt,
          clinicId,
          clinic,
          times,
          open,
          ...rest
        }
      ) => {
        const { fantasy, title } = clinic!

        const calculateTotalHour = calculateTotalHours(
          JSON.parse(`${times}`),
          open
        )
        const item = { ...rest, workHours: calculateTotalHour }

        if (!acc[`${clinicId}`]) {
          acc[`${clinicId}`] = {
            fantasy,
            title,
            workHours: []
          }
        }

        acc[`${clinicId}`].workHours.push(item)
        acc[`${clinicId}`].workHours.sort((a: any, b: any) => {
          return (
            daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
          )
        })

        return acc
      },
      {}
    )

    const workTimeRecommendResult = (
      await this.db.workTimeRecommend.findMany({
        where: {
          clinic: {
            userId
          }
        },
        include: {
          clinic: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    ).reduce(
      (
        acc: Record<string, any>,
        {
          id,
          deletedAt,
          updatedAt,
          createdAt,
          clinicId,
          clinic,
          times,
          open,
          ...rest
        }
      ) => {
        const { fantasy, title } = clinic!

        const calculateTotalHour = calculateTotalHours(
          JSON.parse(`${times}`),
          open
        )
        const item = { ...rest, workHourRecommends: calculateTotalHour }

        if (!acc[`${clinicId}`]) {
          acc[`${clinicId}`] = {
            fantasy,
            title,
            workHourRecommends: []
          }
        }

        acc[`${clinicId}`].workHourRecommends.push(item)
        acc[`${clinicId}`].workHourRecommends.sort((a: any, b: any) => {
          return (
            daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
          )
        })

        return acc
      },
      {}
    )

    const mergedData = this.mergeResults(
      workTimeResult,
      workTimeRecommendResult
    )

    return [...Object.values(mergedData)]
  }
}
