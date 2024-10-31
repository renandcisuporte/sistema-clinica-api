import { ExpenseOutput } from '@/modules/expenses/prisma/entities/expense'
import { ExpenseRepository } from '../prisma/repositories/expense-repository'

type Output = {
  total: number
  active: number
  inative: number
  fixed: number
  variable: number
  data: ExpenseOutput[]
}

export class FindAllExpenseUseCase implements FindAllExpenseUseCaseInterface {
  constructor(protected readonly repository: ExpenseRepository) {}

  async execute(args: any): Promise<Output> {
    const { clinicId, description = '', limit, page } = args

    const common = {
      clinicId,
      description,
      limit,
      page
    }

    const [fixed, variable, active, inative, total, data] = await Promise.all([
      this.repository.count({
        clinicId,
        active: 'true',
        type: 'fixed'
      }),
      this.repository.count({
        clinicId,
        active: 'true',
        type: 'variable'
      }),
      this.repository.count({ clinicId, active: 'true' }),
      this.repository.count({ clinicId, active: 'false' }),
      this.repository.count({ clinicId, description }),
      this.repository.all(common)
    ])

    return {
      fixed,
      variable,
      active,
      inative,
      total,
      data
    }
  }
}

export interface FindAllExpenseUseCaseInterface {
  execute(args: any): Promise<Output>
}
