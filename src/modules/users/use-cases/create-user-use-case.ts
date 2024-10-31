import { UserInput, UserOutput } from '@/modules/users/prisma/entities/user'
import { UserRepository } from '@/modules/users/prisma/repositories/user-repository'
import { AppError } from '@/shared/errors/app-error'
import { hashPass } from '@/shared/utils'

export class CreateUserUseCase implements CreateUserUseCaseInterface {
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

export interface CreateUserUseCaseInterface {
  execute(input: UserInput & { confirmPassword: string }): Promise<UserOutput>
}
