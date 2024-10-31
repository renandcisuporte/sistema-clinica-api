import { AuthController } from '@/modules/auth/controllers/auth-controller'
import { AuthRepositoryImp } from '@/modules/auth/prisma/repositories/implementation/auth-repository'
import { AuthRefreshUseCase } from '@/modules/auth/use-cases/auth-refresh-use-case'
import { AuthUseCase } from '@/modules/auth/use-cases/auth-use-case'
import { ClinicRepositoryImp } from '@/modules/clinics/prisma/repositories/implementation/clinic-repository'
import { validated } from '@/shared/http/middlewares/validated'
import { authSchema } from '@/shared/http/routes/schemas/validations/auth-schema'
import prisma from '@/shared/prisma'
import { Router } from 'express'

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
