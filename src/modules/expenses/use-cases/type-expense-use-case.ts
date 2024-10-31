import { ExpenseRepository } from '@/modules/expenses/prisma/repositories/expense-repository'

export class TypeExpenseUseCase implements TypeExpenseUseCaseInterface {
  constructor(private readonly repository: ExpenseRepository) {}

  async execute(id: string): Promise<unknown> {
    await this.repository.activeInativeTypes(id)
    return { data: { message: 'Atualizado com sucesso!' } }
  }
}

export interface TypeExpenseUseCaseInterface {
  execute(id: string): Promise<unknown>
}
