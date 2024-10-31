import { ExpenseController } from '@/modules/expenses/controllers/expense-controller'
import { ExpenseRepositoryImp } from '@/modules/expenses/prisma/repositories/implementation/expense-repository'
import { ActiveInativeExpenseUseCase } from '@/modules/expenses/use-cases/active-inative-expense-use-case'
import { CreateExpenseUseCase } from '@/modules/expenses/use-cases/create-expense-use-case'
import { DeleteExpenseUseCase } from '@/modules/expenses/use-cases/delete-expense-use-case'
import { FindAllExpenseUseCase } from '@/modules/expenses/use-cases/find-all-expense-use-case'
import { FindFirstExpenseUseCase } from '@/modules/expenses/use-cases/find-first-expense-use-case'
import { UpdateExpenseUseCase } from '@/modules/expenses/use-cases/update-expense-use-case'
import { validated } from '@/shared/http/middlewares/validated'
import {
  createExpenseSchema,
  paramsExpenseSchema,
  updateExpenseSchema
} from '@/shared/http/routes/schemas/validations/expense-schema'
import prisma from '@/shared/prisma'
import { Router } from 'express'
import { TypeExpenseUseCase } from '../use-cases/type-expense-use-case'

export const expenseRouter = Router()

const expenseRepository = new ExpenseRepositoryImp(prisma)
const findAllExpenseUseCase = new FindAllExpenseUseCase(expenseRepository)
const findFirstExpenseUseCase = new FindFirstExpenseUseCase(expenseRepository)
const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository)
const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository)
const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository)
const activeInativeExpenseUseCase = new ActiveInativeExpenseUseCase(
  expenseRepository
)
const typeExpenseUseCase = new TypeExpenseUseCase(expenseRepository)

const expenseController = new ExpenseController(
  findAllExpenseUseCase,
  findFirstExpenseUseCase,
  createExpenseUseCase,
  updateExpenseUseCase,
  deleteExpenseUseCase,
  activeInativeExpenseUseCase,
  typeExpenseUseCase
)

expenseRouter.get(
  '/',
  async (req, res) => await expenseController.findAll(req, res)
)

expenseRouter.get(
  '/:id',
  validated(paramsExpenseSchema),
  async (req, res) => await expenseController.findFirst(req, res)
)

expenseRouter.post(
  '/',
  validated(createExpenseSchema),
  async (req, res) => await expenseController.create(req, res)
)

expenseRouter.put(
  '/:id',
  validated(updateExpenseSchema),
  async (req, res) => await expenseController.update(req, res)
)

expenseRouter.put(
  '/:id/types/active-inative',
  validated(paramsExpenseSchema),
  async (req, res) => await expenseController.activeInativeType(req, res)
)

expenseRouter.put(
  '/:id/active-inative',
  validated(paramsExpenseSchema),
  async (req, res) => await expenseController.activeInative(req, res)
)

expenseRouter.delete(
  '/:id',
  validated(paramsExpenseSchema),
  async (req, res) => await expenseController.delete(req, res)
)
