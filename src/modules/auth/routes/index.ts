import prisma from '@/database/prisma'
import { validate } from '@/middleware/validations'
import { AuthController } from '@/modules/auth/controllers/auth.controller'
import { AuthRepository } from '@/modules/auth/repositories/prisma/auth-prisma'
import { authSchema } from '@/modules/auth/schemas/auth.schema'
import { AuthUseCase } from '@/modules/auth/use-cases/auth.use-case'
import { Request, Response, Router } from 'express'

export const routerAuth = Router()

const authUser = new AuthController(new AuthUseCase(new AuthRepository(prisma)))
routerAuth.post('/', validate(authSchema), (req: Request, res: Response) =>
  authUser.handle(req, res)
)
