import { Expense as ExpensePrisma } from '@prisma/client'

export type ExpenseInput = Pick<ExpensePrisma, 'clinicId'>

export type ExpenseOutput = Omit<ExpensePrisma, 'deletedAt'>
