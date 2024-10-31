import { AuthToken } from '@/modules/auth/prisma/entities/auth'
import { AuthRepository } from '@/modules/auth/prisma/repositories/auth-repository'
import { AppError } from '@/shared/errors/app-error'
import { hashJwt, verifyJwt } from '@/shared/utils'

export class AuthRefreshUseCase implements AuthRefreshUseCaseInterface {
  constructor(protected readonly auth: AuthRepository) {}

  async execute(auth: string) {
    const token = auth!.replace('Bearer ', '')
    const decoded = verifyJwt(token) as {
      id: string
      admin: string
      clinicId: string
    }
    const { clinicId, id } = decoded
    const result = await this.auth.findById(id)
    if (!result) throw new AppError('Usuário não autorizado')

    const { ...user } = result

    return {
      data: {
        accessToken: hashJwt({ clinicId, user }, '30m')
      }
    }
  }
}

type Output = { data: Pick<AuthToken, 'accessToken'> }

export interface AuthRefreshUseCaseInterface {
  execute(auth: string): Promise<Output>
}
