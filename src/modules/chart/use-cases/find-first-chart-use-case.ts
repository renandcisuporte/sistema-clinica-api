// import { Chart } from '@/domain/entities/chart'
import { Chart } from '@/modules/chart/prisma/entities/chart'
import { ChartRepository } from '@/modules/chart/prisma/repositories/chart-repository'
import { ClinicRepository } from '@/modules/clinics/prisma/repositories/clinic-repository'
import { PeopleRepository } from '@/modules/peoples/prisma/repositories/people-repository'
import { RoomsRepository } from '@/modules/rooms/prisma/repositories/room-repository'

export class FindFirstChartUseCase implements FindFirstChartUseCaseIterface {
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
      procedure: countRoom * ((workTimeRecommendSum * 60) / +minutes) * 4,
      idleProcedure: countRoomOff * ((workTimeRecommendSum * 60) / +minutes) * 4
    }
    data.annualCapacity = {
      procedure: countRoom * ((workTimeRecommendSum * 60) / +minutes) * 4 * 12,
      idleProcedure:
        countRoomOff * ((workTimeRecommendSum * 60) / +minutes) * 4 * 12
    }

    return {
      data: {
        ...data,
        ...workHourData
      }
    }
  }
}

type Output = { data: Record<string, any> }

export interface FindFirstChartUseCaseIterface {
  execute(clinicId: string): Promise<Output>
}
