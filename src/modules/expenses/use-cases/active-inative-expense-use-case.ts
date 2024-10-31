import { ExpenseRepository } from '@/modules/expenses/prisma/repositories/expense-repository'

export class ActiveInativeExpenseUseCase
  implements ActiveInativeExpenseUseCaseInterface
{
  constructor(private readonly repository: ExpenseRepository) {}

  async execute(id: string): Promise<unknown> {
    await this.repository.activeInative(id)
    return { data: { message: 'Atualizado com sucesso!' } }
  }
}

export interface ActiveInativeExpenseUseCaseInterface {
  execute(id: string): Promise<unknown>
}
