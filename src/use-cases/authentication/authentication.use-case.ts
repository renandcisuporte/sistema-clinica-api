import { AppError } from '@/common/app.error'
import { AuthenticationRepositoryInterface } from '@/repositories/authentication.interface'
import { hashJwt, verifyPass } from '@/utils'
import {
  AuthenticationIntefaceDTO,
  AuthenticationResponseUseCase
} from './authentication-interface'

export class AuthenticationUseCase {
  constructor(
    protected readonly repository: AuthenticationRepositoryInterface
  ) {}

  async execute(
    input: AuthenticationIntefaceDTO
  ): Promise<AuthenticationResponseUseCase> {
    const result = await this.repository.first(input.email)
    if (!result) throw new AppError('Usuário não autorizado')

    const isMatchPassword = verifyPass(input.password, result.password)
    if (!isMatchPassword) throw new AppError('Usuário não autorizado!')

    const { password, ...user } = result

    return {
      data: {
        user,
        accessToken: hashJwt({ ...user }),
        refreshToken: null
      }
    }
  }
}
