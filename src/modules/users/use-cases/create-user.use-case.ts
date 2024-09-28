import { CreateUseCaseAbstract } from '@/common/abstracts/use-cases.abstract'
import { hashPass } from '@/utils'

export class CreateUserUseCase extends CreateUseCaseAbstract {
  async execute(input: any) {
    const { fullName, email, password } = input

    const result = await this.repository.create({
      email,
      fullName,
      password: hashPass(password)
    })
    return { data: result }
  }
}
