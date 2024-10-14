import { WorkTimeInterface } from '@/entities/work-times'
import { WorkTimesRepositoryInterface } from '@/repositories/work-times.inteface'
import { PrismaClient } from '@prisma/client'

export class WrokTimesRepository implements WorkTimesRepositoryInterface {
  constructor(protected readonly db: PrismaClient) {}

  async delete(args: any): Promise<void> {
    const { id } = args
    await this.db.workTime.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() }
    })
  }

  async update(
    id: string,
    input: WorkTimeInterface
  ): Promise<WorkTimeInterface> {
    const { createdAt, updatedAt, ...restInput } = input
    const res = await this.db.workTime.update({
      where: { id, deletedAt: null },
      data: {
        ...restInput
      }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async create(input: WorkTimeInterface): Promise<WorkTimeInterface> {
    const { id, createdAt, updatedAt, ...restInput } = input
    const res = await this.db.workTime.create({
      data: {
        ...restInput
      }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async first(args: any): Promise<WorkTimeInterface | null> {
    const { id } = args
    const res = await this.db.workTime.findUnique({
      where: { id, deletedAt: null }
    })
    if (!res) return null
    const { deletedAt, ...rest } = res
    return { ...rest }
  }
}
