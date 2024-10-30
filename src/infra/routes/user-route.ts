import prisma from '@/database/prisma'
import { UserRepositoryImpl } from '@/domain/repositories/user-repository'
import { UserController } from '@/infra/http/controllers/user-controller'
import { validated } from '@/infra/http/middlewares/validated'
import { createUserSchema } from '@/infra/http/schemas/validations/user-schema'
import { CreateUserUseCase } from '@/use-cases/create-user-use-case'
import { Router } from 'express'

export const userRouter = Router()

const repository = new UserRepositoryImpl(prisma)
const createUserUseCase = new CreateUserUseCase(repository)

const userController = new UserController(createUserUseCase)

userRouter.post(
  '/',
  validated(createUserSchema),
  async (req, res) => await userController.createUser(req, res)
)

userRouter.post(
  '/reset-forget-password',
  async (req, res) => await userController.createUser(req, res)
)
