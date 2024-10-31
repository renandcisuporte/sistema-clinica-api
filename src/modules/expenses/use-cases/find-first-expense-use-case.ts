import { ExpenseOutput } from '@/modules/expenses/prisma/entities/expense'
import { ExpenseRepository } from '@/modules/expenses/prisma/repositories/expense-repository'

type Output = {
  data: ExpenseOutput | null
}

export class FindFirstExpenseUseCase
  implements FindFirstExpenseUseCaseInterface
{
  constructor(protected readonly repository: ExpenseRepository) {}

  async execute(id: string): Promise<Output> {
    const result = await this.repository.first(id)
    return {
      data: result
    }
  }
}

export interface FindFirstExpenseUseCaseInterface {
  execute(id: string): Promise<Output>
}
