import { daysOfWeekOrder } from '@/contants'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'
import { WorkTimesRepositoryInterface } from '@/repositories/work-times.inteface'

export class FindFirstWorkTimesUseCase {
  constructor(
    protected readonly clinic: ClinicsRepositoryInterface,
    protected readonly workTime: WorkTimesRepositoryInterface,
    protected readonly workTimeRecommended: WorkTimesRepositoryInterface
  ) {}

  async execute({ userId, clinicId }: any) {
    const clinics = await this.clinic.first({ userId, id: clinicId })
    const workTimesAll = await this.workTime.all(clinicId)
    const workTimesRecommendedAll = await this.workTimeRecommended.all(clinicId)

    const workTimes = workTimesAll
      ?.map(({ clinicId, createdAt, updatedAt, id, times, ...item }) => ({
        ...item,
        times: JSON.parse(`${times}`)
      }))
      .sort((a, b) => {
        return daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
      })

    const workTimesRecommended = workTimesRecommendedAll
      ?.map(({ clinicId, createdAt, updatedAt, id, times, ...item }) => ({
        ...item,
        times: JSON.parse(`${times}`)
      }))
      .sort((a, b) => {
        return daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
      })

    return {
      data: {
        ...clinics,
        worksTimes: 0,
        worksTimesRecommended: 0,
        workTimes,
        workTimesRecommended
      }
    }
  }
}
