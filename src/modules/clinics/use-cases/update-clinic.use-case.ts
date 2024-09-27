import { UseCaseUpdateAbstract } from '@/common/abstracts/use-cases.abstract'
import { ClinicAbstractRepository } from '../repositories/clinic.abstract.repository'

export class UpdateClinicUseCase extends UseCaseUpdateAbstract<ClinicAbstractRepository> {
  async execute(id: any, input: any) {
    const result = await this.repository.update(id, input)
    return { data: result }
  }
}
