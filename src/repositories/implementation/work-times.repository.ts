import { daysOfWeekOrder } from '@/contants'
import { ChartsInterface } from '@/entities/charts'
import { WorkTimeInterface } from '@/entities/work-times'
import { WorkTimesRepositoryInterface } from '@/repositories/work-times.inteface'
import { calculateTotalHours } from '@/utils'
import { PrismaClient } from '@prisma/client'

export class WorkTimesRepository implements WorkTimesRepositoryInterface {
  constructor(protected readonly db: PrismaClient) {}

  async chart(userId: string): Promise<ChartsInterface[]> {
    const result = await this.db.workTime.findMany({
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

    const response = result.reduce(
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

    return [...Object.values(response)]
  }

  async delete(id: string): Promise<void> {
    await this.db.workTime.deleteMany({
      where: { clinicId: id }
    })
  }

  async create(input: WorkTimeInterface): Promise<WorkTimeInterface> {
    const { createdAt, updatedAt, ...restInput } = input

    const res = await this.db.workTime.create({
      data: {
        ...restInput
      }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async all(clinicId: string): Promise<WorkTimeInterface[] | null> {
    const res = await this.db.workTime.findMany({
      where: { clinicId, deletedAt: null }
    })

    if (!res) return null
    return res.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }
}
