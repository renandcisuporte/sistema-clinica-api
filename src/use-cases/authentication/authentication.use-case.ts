import { AppError } from '@/common/app.error'
import { AuthenticationRepositoryInterface } from '@/repositories/authentication.interface'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import {
  AuthenticationIntefaceDTO,
  AuthenticationResponseUseCase
} from './authentication.interface'

export class AuthenticationUseCase {
  constructor(
    protected readonly auth: AuthenticationRepositoryInterface,
    protected readonly clinic: ClinicsRepositoryInterface
  ) {}

  async execute(
    input: AuthenticationIntefaceDTO
  ): Promise<AuthenticationResponseUseCase> {
    const result = await this.auth.first(input.email)
    if (!result) throw new AppError('Usuário não autorizado')

    if (!(await bcrypt.compare(input.password, result.password)))
      throw new AppError('Usuário não autorizado!')

    const clinic = await this.clinic.findClinicCode(input.code)
    if (!clinic) throw new AppError('Clínica não encontrada!')

    const { password, ...user } = result
    return {
      data: {
        user,
        clinicId: clinic,
        accessToken: jwt.sign(
          { clinicId: clinic, user },
          process.env.SUPER_SECRETS!,
          {
            expiresIn: '10min'
          }
        ),
        refreshToken: jwt.sign(
          { clinicId: clinic, user },
          process.env.SUPER_SECRETS!,
          {
            expiresIn: '30d'
          }
        )
      }
    }
  }
}
