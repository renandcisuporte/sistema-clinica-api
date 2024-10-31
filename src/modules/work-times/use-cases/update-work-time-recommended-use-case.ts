import { WorkTimeInput } from '@/modules/work-times/prisma/entities/work-time'
import { WorkTimeRepository } from '@/modules/work-times/prisma/repositories/work-time-repository'
import { AppError } from '@/shared/errors/app-error'

type Input = {
  clinicId: string
  input: WorkTimeInput[]
}

type Output = {
  data: {
    message: string
  }
}

export class UpdateWorkTimeRecommendedUseCase
  implements UpdateWorkTimeRecommendedUseCaseIterface
{
  constructor(protected readonly repository: WorkTimeRepository) {}

  async execute(data: Input): Promise<Output> {
    const { clinicId, input } = data

    for (const workTime of input) {
      const { week, times, open } = workTime

      if (clinicId !== workTime.clinicId)
        throw new AppError('Clinicas não encontradas', 404)

      await this.repository.createRecommended({
        clinicId,
        week,
        open: open,
        times: JSON.stringify(times)
      })
    }

    return {
      data: {
        message: 'Atualizado com sucesso'
      }
    }
  }
}

export interface UpdateWorkTimeRecommendedUseCaseIterface {
  execute(data: Input): Promise<Output>
}
