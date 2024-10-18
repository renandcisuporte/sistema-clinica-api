import { AppError } from '@/common/app.error'
import { AuthenticationRepositoryInterface } from '@/repositories/authentication.interface'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import {
  AuthenticationIntefaceDTO,
  AuthenticationResponseUseCase
} from './authentication.interface'

export class AuthenticationUseCase {
  constructor(
    protected readonly repository: AuthenticationRepositoryInterface
  ) {}

  async execute(
    input: AuthenticationIntefaceDTO
  ): Promise<AuthenticationResponseUseCase> {
    const result = await this.repository.first(input.email)
    if (!result) throw new AppError('Usuário não autorizado')

    if (!(await bcrypt.compare(input.password, result.password)))
      throw new AppError('Usuário não autorizado!')

    const { password, ...user } = result

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
