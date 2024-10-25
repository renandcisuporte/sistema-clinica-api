import { UserInput, UserOutput } from '@/domain/entities/user'
import { UserRepository } from '@/domain/inferfaces/repositories/user-repository'
import { AppError } from '@/infra/error/app.error'
import { hashPass } from '@/shared/utils'

export class CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    input: UserInput & { confirmPassword: string }
  ): Promise<UserOutput> {
    const { password, confirmPassword, ...rest } = input
    const userIsExists = await this.repository.findByEmail(input.email)
    if (userIsExists)
      throw new AppError(`Usuário ${input.email} já cadastrado!`, 409)

    const passwordHash = hashPass(password)

    const user = await this.repository.create({
      ...rest,
      password: passwordHash
    })
    return user
  }
}
