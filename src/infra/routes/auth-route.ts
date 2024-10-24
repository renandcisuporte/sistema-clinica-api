import prisma from '@/database/prisma'
import { AuthRepositoryImp } from '@/domain/repositories/auth-repository'
import { ClinicRepositoryImp } from '@/domain/repositories/clinic-repository'
import { validated } from '@/infra/http/middleware/validated'
import { authSchema } from '@/infra/http/schemas/validations/auth-schema'
import { AuthRefreshUseCase } from '@/use-cases/auth-refresh-use-case'
import { AuthUseCase } from '@/use-cases/auth-use-case'
import { Router } from 'express'

export const authRouter = Router()

const authRepository = new AuthRepositoryImp(prisma)
const clinicRepository = new ClinicRepositoryImp(prisma)

const authUseCase = new AuthUseCase(authRepository, clinicRepository)
const authRefreshUseCase = new AuthRefreshUseCase(authRepository)

authRouter.post('/', validated(authSchema), async (req, res) => {
  const { body } = req
  const resutl = await authUseCase.execute(body)
  return res.status(201).json(resutl)
})

authRouter.post(
  '/refresh-token',
  // validated(authRefreshTokenSchema),
  async (req, res) => {
    const { authorization } = req.headers
    const resutl = await authRefreshUseCase.execute(authorization!)
    return res.status(201).json(resutl)
  }
)
