// import { Chart } from '@/domain/entities/chart'
import { Chart } from '@/domain/entities/chart'
import { ChartRepository } from '@/domain/inferfaces/repositories/chart-repository'
import { ClinicRepository } from '@/domain/inferfaces/repositories/clinic-repository'
import { PeopleRepository } from '@/domain/inferfaces/repositories/people-repository'
import { RoomsRepository } from '@/domain/inferfaces/repositories/room-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

type Output = { data: Record<string, any> }
export class FindFirstChartUseCase implements UseCase<string, Output> {
  constructor(
    protected readonly repoChart: ChartRepository,
    protected readonly repoPeople: PeopleRepository,
    protected readonly repoRoom: RoomsRepository,
    protected readonly repoClinic: ClinicRepository
  ) {}

  async execute(clinicId: string) {
    const data: Record<string, any> = {}

    const [workTimesAll, countPeople, countRoom, clinic] = await Promise.all([
      this.repoChart.chart(clinicId),
      this.repoPeople.count({ clinicId, type: 'specialist' }),
      this.repoRoom.count({ clinicId, active: 'true' }),
      this.repoClinic.findFirst(clinicId)
    ])

    const minutes = clinic?.averageService || '0'

    const { workHours, ...rest } = workTimesAll as Chart

    const workHourData: Chart = {
      ...rest,
      workHours: workHours.map((item) => {
        const { workTimeRecommend, ...rest } = item
        return {
          ...rest,
          workTimeRecommend,
          dailyProcedure: countRoom * ((workTimeRecommend * 60) / +minutes),
          dailyIdleProcedure:
            (countRoom - countPeople) * ((workTimeRecommend * 60) / +minutes)
        }
      })
    }

    // const workTimeRecommend =
    //   'workTimeRecommend' in workHourData ? workHourData.workTimeRecommend : 0

    // data.capacidadePorDia = countRoom * ((workTimeRecommend * 60) / +minutes)
    // data.espacoOciosoDia = (countRoom - countPeople) * ((workTimeRecommend * 60) / +minutes)
    // data.espacoTotalDia = countRoom * ((workTimeRecommend * 60) / +minutes)

    // data.weekend = 0
    // data.month = 0
    // data.year = 0

    return {
      data: {
        ...data,
        ...workHourData
      }
    }
  }
}
