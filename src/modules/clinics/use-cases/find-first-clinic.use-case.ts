import { FirstUseCaseAbstract } from '@/common/abstracts/use-cases.abstract'

export class FindFirstClinicUseCase extends FirstUseCaseAbstract {
  async execute(id: string) {
    const result = await this.repository.first(id)
    return { data: result }
  }
}
