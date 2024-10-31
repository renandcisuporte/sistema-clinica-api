import { ExpenseRepository } from '@/modules/expenses/prisma/repositories/expense-repository'

export class DeleteExpenseUseCase implements DeleteExpenseUseCaseInterface {
  constructor(protected readonly repository: ExpenseRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export interface DeleteExpenseUseCaseInterface {
  execute(id: string): Promise<void>
}
