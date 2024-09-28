import { AllUseCaseAbstract } from '@/common/abstracts/use-cases.abstract'

export class FindAllUserUseCase extends AllUseCaseAbstract {
  async execute(params: undefined) {
    const result = await this.repository.all(params)
    return { data: result }
  }
}
