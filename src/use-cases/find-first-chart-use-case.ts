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

    const [workTimesAll, countPeople, countRoom, countRoomOff, clinic] =
      await Promise.all([
        this.repoChart.chart(clinicId),
        this.repoPeople.count({ clinicId, type: 'specialist' }),
        this.repoRoom.count({ clinicId, active: 'true' }),
        this.repoRoom.count({ clinicId, active: 'false' }),
        this.repoClinic.findFirst(clinicId)
      ])

    const minutes = clinic?.averageService || '0'

    const { workHours, ...rest } = workTimesAll as Chart

    let workTimeRecommendSum = 0
    const workHourData: Chart = {
      ...rest,
      workHours: workHours.map((item) => {
        const { workTimeRecommend, ...rest } = item
        workTimeRecommendSum += workTimeRecommend
        return {
          ...rest,
          workTimeRecommend,
          dailyProcedure: countRoom * ((workTimeRecommend * 60) / +minutes),
          dailyIdleProcedure:
            countRoomOff * ((workTimeRecommend * 60) / +minutes)
        }
      })
    }

    data.weeklyCapacity = {
      procedure: countRoom * ((workTimeRecommendSum * 60) / +minutes),
      idleProcedure: countRoomOff * ((workTimeRecommendSum * 60) / +minutes)
    }
    data.monthlyCapacity = {
      procedure: countRoom * ((workTimeRecommendSum * 60) / +minutes) * 30,
      idleProcedure:
        countRoomOff * ((workTimeRecommendSum * 60) / +minutes) * 30
    }
    data.annualCapacity = {
      procedure: countRoom * ((workTimeRecommendSum * 60) / +minutes) * 365,
      idleProcedure:
        countRoomOff * ((workTimeRecommendSum * 60) / +minutes) * 365
    }

    return {
      data: {
        ...data,
        ...workHourData
      }
    }
  }
}
