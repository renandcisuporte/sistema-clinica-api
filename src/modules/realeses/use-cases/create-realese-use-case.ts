import {
  RealeseOutput,
  RealeseUpSave
} from '@/modules/realeses/prisma/entities/realese'
import { RealeseRepository } from '@/modules/realeses/prisma/repositories/realese-repository'
import { priceFormated } from '@/shared/utils'

export class CreateRealeseUseCase implements CreateRealeseUseCaseInterface {
  constructor(protected readonly repository: RealeseRepository) {}

  async execute(input: RealeseUpSave): Promise<{ data: any }> {
    const { clinicId, ...restInput } = input
    for (const expenseId in restInput) {
      for (const date in input[expenseId]) {
        const { price } = input[expenseId][date]

        await this.repository.upsave({
          clinicId,
          expenseId,
          date: new Date(date),
          price: priceFormated(price)
        })
      }
    }

    return { data: 'ok' }
  }
}

export interface CreateRealeseUseCaseInterface {
  execute(input: RealeseUpSave): Promise<{ data: RealeseOutput }>
}
