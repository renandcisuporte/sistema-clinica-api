import { AuthToken } from '@/domain/entities/auth'
import { AuthRepository } from '@/domain/inferfaces/repositories/auth-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'
import { AppError } from '@/infra/error/app.error'
import { hashJwt, verifyJwt } from '@/shared/utils'

type Simple = Pick<AuthToken, 'accessToken'>

export class AuthRefreshUseCase implements UseCase<string, { data: Simple }> {
  constructor(protected readonly auth: AuthRepository) {}

  async execute(auth: string): Promise<{ data: Simple }> {
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
