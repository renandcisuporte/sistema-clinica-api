import { daysOfWeekOrder } from '@/contants'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'
import { WorkTimesRepositoryInterface } from '@/repositories/work-times.inteface'

export class FindFirstWorkTimesRecommendedUseCase {
  constructor(
    protected readonly clinic: ClinicsRepositoryInterface,
    protected readonly workTime: WorkTimesRepositoryInterface
  ) {}

  async execute({ userId, clinicId }: any) {
    const clinics = await this.clinic.first({ userId, id: clinicId })
    const workTimesAll = await this.workTime.all(clinicId)

    const workTimes = workTimesAll
      ?.map(({ times, ...item }) => ({
        ...item,
        times: JSON.parse(`${times}`)
      }))
      .sort((a, b) => {
        return daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
      })

    return {
      data: {
        ...clinics,
        workTimes
      }
    }
  }
}
