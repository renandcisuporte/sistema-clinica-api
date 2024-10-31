import {
  ExpenseInput,
  ExpenseOutput
} from '@/modules/expenses/prisma/entities/expense'
import { ExpenseRepository } from '@/modules/expenses/prisma/repositories/expense-repository'

export class UpdateExpenseUseCase implements UpdateExpenseUseCaseInterface {
  constructor(protected readonly repository: ExpenseRepository) {}

  async execute(
    id: string,
    input: ExpenseInput
  ): Promise<{ data: ExpenseOutput }> {
    const result = await this.repository.update(id, input)

    return { data: result }
  }
}

export interface UpdateExpenseUseCaseInterface {
  execute(id: string, input: ExpenseInput): Promise<{ data: ExpenseOutput }>
}
