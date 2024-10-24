import { AuthInput, AuthToken } from '@/domain/entities/auth'
import { AuthRepository } from '@/domain/inferfaces/repositories/auth-repository'
import { ClinicRepository } from '@/domain/inferfaces/repositories/clinic-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'
import { AppError } from '@/infra/http/error/app.error'
import { hashJwt, verifyPass } from '@/shared/utils'

export class AuthUseCase implements UseCase<AuthInput, { data: AuthToken }> {
  constructor(
    protected readonly auth: AuthRepository,
    protected readonly clinic: ClinicRepository
  ) {}

  async execute(input: AuthInput): Promise<{ data: AuthToken }> {
    const result = await this.auth.findByEmail(input.email)
    if (!result) throw new AppError('Usuário não autorizado')

    if (!verifyPass(input.password, result.password))
      throw new AppError('Usuário não autorizado!')

    const clinic = await this.clinic.findByCode(input.code)
    if (!clinic && input.code !== '000-000')
      throw new AppError('Clínica não encontrada!')

    if (clinic && input.code !== '000-000') input.code = clinic

    const { password, ...user } = result

    return {
      data: {
        user,
        clinicId: input.code,
        accessToken: hashJwt({ clinicId: input.code, user }, '1m'),
        refreshToken: hashJwt({ clinicId: input.code, user }, '30d')
      }
    }
  }
}
