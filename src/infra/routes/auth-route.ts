import prisma from '@/database/prisma'
import { AuthRepositoryImp } from '@/domain/repositories/auth-repository'
import { ClinicRepositoryImp } from '@/domain/repositories/clinic-repository'
import { validated } from '@/infra/http/middlewares/validated'
import { authSchema } from '@/infra/http/schemas/validations/auth-schema'
import { AuthRefreshUseCase } from '@/use-cases/auth-refresh-use-case'
import { AuthUseCase } from '@/use-cases/auth-use-case'
import { Router } from 'express'
import { AuthController } from '../http/controllers/auth-controller'

export const authRouter = Router()

const authRepository = new AuthRepositoryImp(prisma)
const clinicRepository = new ClinicRepositoryImp(prisma)

const authUseCase = new AuthUseCase(authRepository, clinicRepository)
const authRefreshUseCase = new AuthRefreshUseCase(authRepository)

const authController = new AuthController(authUseCase, authRefreshUseCase)

authRouter.post(
  '/',
  validated(authSchema),
  async (req, res) => await authController.auth(req, res)
)

authRouter.post(
  '/refresh-token',
  async (req, res) => await authController.refreshToken(req, res)
)
