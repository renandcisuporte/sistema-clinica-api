import {
  ExpenseInput,
  ExpenseOutput
} from '@/modules/expenses/prisma/entities/expense'

export interface ExpenseRepository {
  count(...args: any): Promise<number>
  all(...args: any): Promise<ExpenseOutput[]>
  first(id: string): Promise<ExpenseOutput | null>
  create(input: ExpenseInput): Promise<ExpenseOutput>
  update(id: string, input: ExpenseInput): Promise<ExpenseOutput>
  activeInative(id: string): Promise<void>
  activeInativeTypes(id: string): Promise<void>
  delete(id: string): Promise<void>
}
