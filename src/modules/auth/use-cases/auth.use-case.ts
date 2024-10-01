import { AppError } from '@/common/errors/app.error'
import { FirstRepositoryInterface } from '@/common/interfaces/repository.interface'
import { FirstUseCaseInterface } from '@/common/interfaces/use-case.interface'
import { hashJwt, verifyPass } from '@/utils'

type TokenType = {
  data: {
    user: {
      id: string
      email: string
      fullName: string
    }
    accessToken: string
    refreshToken: string | null
  }
}

type AuthType = {
  email: string
  password: string
}

export class AuthUseCase implements FirstUseCaseInterface {
  constructor(protected readonly repository: FirstRepositoryInterface) {}

  async execute({ email, password }: AuthType): Promise<TokenType> {
    const result = await this.repository.first(email)
    if (!result) throw new AppError('Usuário não autorizado')

    const isMatchPassword = verifyPass(password, result.password)
    if (!isMatchPassword) throw new AppError('Usuário não autorizado!')
    console.log('ap', { ...result })

    const user = {
      id: result.id,
      fullName: result.fullName,
      email: result.email
    }

    return {
      data: {
        user,
        accessToken: hashJwt({ ...user }),
        refreshToken: null
      }
    }
  }
}
