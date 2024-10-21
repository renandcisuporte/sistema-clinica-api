import { AppError } from '@/common/app.error'
import { AuthenticationRepositoryInterface } from '@/repositories/authentication.interface'
import { AuthenticationRefreshTokenResponseUseCase } from '@/use-cases/authentication/authentication-refresh-token.interface'
import * as jwt from 'jsonwebtoken'

export class AuthenticationRefreshTokenUseCase {
  constructor(
    protected readonly repository: AuthenticationRepositoryInterface
  ) {}

  async execute(
    authorization: any
  ): Promise<AuthenticationRefreshTokenResponseUseCase> {
    const token = authorization!.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SUPER_SECRETS!) as {
      id: string
      admin: string
      clinicId: string
    }
    const { clinicId, id } = decoded

    const result = await this.repository.find(id)
    if (!result) throw new AppError('Usuário não autorizado')
    const { ...user } = result

    return {
      data: {
        user,
        clinicId,
        accessToken: jwt.sign({ clinicId, user }, process.env.SUPER_SECRETS!, {
          expiresIn: '10min'
        }),
        refreshToken: jwt.sign({ clinicId, user }, process.env.SUPER_SECRETS!, {
          expiresIn: '30d'
        })
      }
    }
  }
}
