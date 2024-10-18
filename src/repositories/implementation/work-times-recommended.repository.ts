import { WorkTimeInterface } from '@/entities/work-times'
import { WorkTimesRepositoryInterface } from '@/repositories/work-times.inteface'
import { PrismaClient } from '@prisma/client'

export class WorkTimesRecommendedRepository
  implements WorkTimesRepositoryInterface
{
  constructor(protected readonly db: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.db.workTimeRecommend.deleteMany({
      where: { clinicId: id }
    })
  }

  async create(input: WorkTimeInterface): Promise<WorkTimeInterface> {
    const { createdAt, updatedAt, ...restInput } = input

    const res = await this.db.workTimeRecommend.create({
      data: {
        ...restInput
      }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async all(clinicId: string): Promise<WorkTimeInterface[] | null> {
    const res = await this.db.workTimeRecommend.findMany({
      where: { clinicId, deletedAt: null }
    })

    if (!res) return null
    return res.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }
}
