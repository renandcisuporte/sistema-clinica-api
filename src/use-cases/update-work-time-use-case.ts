import { WorkTimeInput } from '@/domain/entities/work-time'
import { WorkTimeRepository } from '@/domain/inferfaces/repositories/work-time-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'
import { AppError } from '@/infra/error/app.error'

type Input = {
  clinicId: string
  input: WorkTimeInput[]
}

type Output = {
  data: {
    message: string
  }
}

export class UpdateWorkTimeUseCase implements UseCase<Input, Output> {
  constructor(protected readonly repository: WorkTimeRepository) {}

  async execute(data: Input): Promise<Output> {
    const { clinicId, input } = data

    for (const workTime of input) {
      const { week, times, open } = workTime

      if (clinicId !== workTime.clinicId)
        throw new AppError('Clinicas não encontradas', 404)

      await this.repository.createWork({
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
