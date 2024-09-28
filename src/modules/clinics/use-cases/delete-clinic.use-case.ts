import { DeleteUseCaseAbstract } from '@/common/abstracts/use-cases.abstract'

export class DeleteClinicUseCase extends DeleteUseCaseAbstract {
  async execute(id: any) {
    const result = await this.repository.delete(id)
    return { data: result }
  }
}
