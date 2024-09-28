import { AllUseCaseAbstract } from '@/common/abstracts/use-cases.abstract'

export class FindAllClinicUseCase extends AllUseCaseAbstract {
  async execute() {
    const result = await this.repository.all()
    return { data: result }
  }
}
