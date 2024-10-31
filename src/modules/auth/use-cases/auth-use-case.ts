import { AuthInput, AuthToken } from '@/modules/auth/prisma/entities/auth'
import { AuthRepository } from '@/modules/auth/prisma/repositories/auth-repository'
import { ClinicRepository } from '@/modules/clinics/prisma/repositories/clinic-repository'
import { AppError } from '@/shared/errors/app-error'
import { hashJwt, verifyPass } from '@/shared/utils'

export class AuthUseCase implements AuthUseCaseIterface {
  constructor(
    protected readonly auth: AuthRepository,
    protected readonly clinic: ClinicRepository
  ) {}

  async execute(input: AuthInput): Promise<Output> {
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
        accessToken: hashJwt({ clinicId: input.code, user }, '5m'),
        refreshToken: hashJwt({ clinicId: input.code, user }, '30d')
      }
    }
  }
}

type Output = { data: AuthToken }

export interface AuthUseCaseIterface {
  execute(input: AuthInput): Promise<Output>
}
