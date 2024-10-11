import prisma from '@/database/prisma'
import { AuthenticationRepository } from '@/repositories/implements/authentication.repository'
import { AuthenticationRefreshTokenController } from '@/use-cases/authentication/authentication-refresh-token.controller'
import { AuthenticationRefreshTokenUseCase } from '@/use-cases/authentication/authentication-refresh-token.use-case'
import { AuthenticationController } from '@/use-cases/authentication/authentication.controller'
import { AuthenticationUseCase } from '@/use-cases/authentication/authentication.use-case'

const db = prisma

// authentication user
const authenticationRepository = new AuthenticationRepository(db)
const authenticationController = new AuthenticationController(
  new AuthenticationUseCase(authenticationRepository)
)

const authRefrshTokenController = new AuthenticationRefreshTokenController(
  new AuthenticationRefreshTokenUseCase(authenticationRepository)
)

export { authenticationController, authRefrshTokenController }
