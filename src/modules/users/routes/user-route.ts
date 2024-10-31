import { UserRepositoryImpl } from '@/domain/repositories/user-repository'
import { UserController } from '@/modules/users/controllers/user-controller'
import { CreateUserUseCase } from '@/modules/users/use-cases/create-user-use-case'
import { validated } from '@/shared/http/middlewares/validated'
import { createUserSchema } from '@/shared/http/routes/schemas/validations/user-schema'
import prisma from '@/shared/prisma'
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
