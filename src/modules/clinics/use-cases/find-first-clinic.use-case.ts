import { UseCaseAbstract } from '@/common/abstracts/use-cases.abstract'

export class FindFirstClinicUseCase extends UseCaseAbstract {
  async execute(id: string) {
    const result = await this.repository.findFirst(id)
    return { data: result }
  }
}
