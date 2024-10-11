import { AppError } from '@/common/app.error'
import { AuthenticationRepositoryInterface } from '@/repositories/authentication.interface'
import { AuthenticationRefreshTokenResponseUseCase } from '@/use-cases/authentication/authentication-refresh-token.interface'
import * as jwt from 'jsonwebtoken'

export class AuthenticationRefreshTokenUseCase {
  constructor(
    protected readonly repository: AuthenticationRepositoryInterface
  ) {}

  async execute(
    id: string
  ): Promise<AuthenticationRefreshTokenResponseUseCase> {
    const result = await this.repository.find(id)
    if (!result) throw new AppError('Usuário não autorizado')
    const { ...user } = result

    return {
      data: {
        user,
        accessToken: jwt.sign(user, process.env.SUPER_SECRETS!, {
          expiresIn: '2h'
        }),
        refreshToken: jwt.sign(user, process.env.SUPER_SECRETS!, {
          expiresIn: '30d'
        })
      }
    }
  }
}
