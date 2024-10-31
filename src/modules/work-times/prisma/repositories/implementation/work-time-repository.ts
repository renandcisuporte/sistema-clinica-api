import {
  WorkTimeInput,
  WorkTimeOutput
} from '@/modules/work-times/prisma/entities/work-time'
import { WorkTimeRepository } from '@/modules/work-times/prisma/repositories/work-time-repository'
import { PrismaClient } from '@prisma/client'

export class WorkTimeRepositoryImp implements WorkTimeRepository {
  constructor(protected readonly db: PrismaClient) {}

  async createWork(input: WorkTimeInput): Promise<WorkTimeOutput> {
    const { clinicId, week, open } = input

    await this.db.workTime.deleteMany({ where: { clinicId, week } })

    const res = await this.db.workTime.create({
      data: { ...input, open: /^true$/i.test(String(open)) }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async createRecommended(input: WorkTimeInput): Promise<WorkTimeOutput> {
    const { clinicId, week, open } = input

    await this.db.workTimeRecommend.deleteMany({ where: { clinicId, week } })

    const res = await this.db.workTimeRecommend.create({
      data: { ...input, open: /^true$/i.test(String(open)) }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async createService(input: WorkTimeInput): Promise<WorkTimeOutput> {
    const { clinicId, week, open } = input

    await this.db.workTimeService.deleteMany({ where: { clinicId, week } })

    const res = await this.db.workTimeService.create({
      data: { ...input, open: /^true$/i.test(String(open)) }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async averageWorkingTime(clinicId: string): Promise<WorkTimeOutput[]> {
    const res = await this.db.workTime.findMany({
      where: { clinicId, deletedAt: null }
    })

    return res.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }

  async recommendedAverageTime(clinicId: string): Promise<WorkTimeOutput[]> {
    const res = await this.db.workTimeRecommend.findMany({
      where: { clinicId, deletedAt: null }
    })

    return res.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }

  async averageServiceTime(clinicId: string): Promise<WorkTimeOutput[]> {
    const res = await this.db.workTimeService.findMany({
      where: { clinicId, deletedAt: null }
    })

    return res.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }
}
