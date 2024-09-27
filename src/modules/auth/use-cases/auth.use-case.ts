import { UseCaseAbstract } from '@/common/abstracts/use-cases.abstract'
import { AppError } from '@/common/errors/app.error'
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

export class AuthUseCase extends UseCaseAbstract {
  async execute({ email, password }: AuthType): Promise<TokenType> {
    const result = await this.repository.auth(email)
    if (!result) throw new AppError('Usuário não autorizado')

    const isMatchPassword = verifyPass(password, result.password)
    if (!isMatchPassword) throw new AppError('Usuário não autorizado!')

    const user = {
      id: result.code,
      email: result.email,
      fullName: result.fullName
    }

    return {
      data: {
        user: user,
        accessToken: hashJwt(user),
        refreshToken: null
      }
    }
  }
}
