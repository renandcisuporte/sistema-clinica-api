import prisma from '@/database/prisma'
import { AuthenticationRepository } from '@/repositories/implements/authentication.repository'
import { AuthenticationController } from '@/use-cases/authentication/authentication.controller'
import { AuthenticationUseCase } from '@/use-cases/authentication/authentication.use-case'

const db = prisma

// authentication user
const authenticationRepository = new AuthenticationRepository(db)
const authenticationController = new AuthenticationController(
  new AuthenticationUseCase(authenticationRepository)
)

export { authenticationController }
