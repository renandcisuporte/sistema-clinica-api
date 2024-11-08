import { ExpenseOutput } from '@/modules/expenses/prisma/entities/expense'
import { ExpenseRepository } from '../prisma/repositories/expense-repository'

type Input = {
  clinicId: string
  type?: string
  active?: string
}

type Output = {
  data: ExpenseOutput[]
}

export class FindAllListExpenseUseCase
  implements FindAllListExpenseUseCaseInterface
{
  constructor(protected readonly repository: ExpenseRepository) {}

  async execute(args: Input): Promise<Output> {
    const { clinicId, active, type } = args

    const data = await this.repository.all({
      clinicId,
      active,
      type,
      limit: 1001
    })

    return {
      data
    }
  }
}

export interface FindAllListExpenseUseCaseInterface {
  execute(args: Input): Promise<Output>
}
