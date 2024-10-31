import {
  ExpenseInput,
  ExpenseOutput
} from '@/modules/expenses/prisma/entities/expense'
import { ExpenseRepository } from '@/modules/expenses/prisma/repositories/expense-repository'

export class CreateExpenseUseCase implements CreateExpenseUseCaseInterface {
  constructor(protected readonly repository: ExpenseRepository) {}

  async execute(input: ExpenseInput): Promise<{ data: ExpenseOutput }> {
    const result = await this.repository.create(input)

    return { data: result }
  }
}

export interface CreateExpenseUseCaseInterface {
  execute(input: ExpenseInput): Promise<{ data: ExpenseOutput }>
}
