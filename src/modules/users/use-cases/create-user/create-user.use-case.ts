import { UseCaseAbstract } from '@/common/abstracts/use-cases.abstract'
import { hashPass } from '@/utils'
import { CreateUser } from '../../dtos/create.inteface'

export class CreateUserUseCase extends UseCaseAbstract {
  async execute(input: CreateUser) {
    const { fullName, email, password } = input

    const result = await this.repository.create({
      email,
      fullName,
      password: hashPass(password)
    })
    return { data: result }
  }
}
