import { UpdateUseCaseAbstract } from '@/common/abstracts/use-cases.abstract'

export class UpdateClinicUseCase extends UpdateUseCaseAbstract {
  async execute(id: any, input: any) {
    const result = await this.repository.update(id, input)
    return { data: result }
  }
}
