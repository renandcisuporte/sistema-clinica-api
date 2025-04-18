import { ClinicRepository } from '@/modules/clinics/prisma/repositories/clinic-repository'
import { WorkTimeRepository } from '@/modules/work-times/prisma/repositories/work-time-repository'

import { daysOfWeekOrder } from '@/shared/contants'

type Output = {
  data: Record<string, any>
}

export class FindFirstClinicWorkTimeUseCase
  implements FindFirstClinicWorkTimeUseCaseInterface
{
  constructor(
    protected readonly clinic: ClinicRepository,
    protected readonly workTime: WorkTimeRepository
  ) {}

  async execute(clinicId: string) {
    const clinic = await this.clinic.findFirst(clinicId)
    const workTime = await this.workTime.averageWorkingTime(clinicId)
    const workTimeRecommended = await this.workTime.recommendedAverageTime(
      clinicId
    )
    const workTimeService = await this.workTime.averageServiceTime(clinicId)

    const workTimes = workTime
      ?.map(({ clinicId, createdAt, updatedAt, id, times, ...item }) => ({
        ...item,
        times: JSON.parse(`${times}`)
      }))
      .sort((a, b) => {
        return daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
      })

    const workTimesRecommended = workTimeRecommended
      ?.map(({ clinicId, createdAt, updatedAt, id, times, ...item }) => ({
        ...item,
        times: JSON.parse(`${times}`)
      }))
      .sort((a, b) => {
        return daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
      })

    const workTimesService = workTimeService
      ?.map(({ clinicId, createdAt, updatedAt, id, times, ...item }) => ({
        ...item,
        times: JSON.parse(`${times}`)
      }))
      .sort((a, b) => {
        return daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
      })

    return {
      data: {
        ...clinic,
        worksTimes: 0,
        worksTimesRecommended: 0,
        worksTimesService: 0,
        workTimes,
        workTimesRecommended,
        workTimesService
      }
    }
  }
}

export interface FindFirstClinicWorkTimeUseCaseInterface {
  execute(clinicId: string): Promise<Output>
}
