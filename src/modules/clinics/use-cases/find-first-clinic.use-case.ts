import { UseCaseFirstAbstract } from '@/common/abstracts/use-cases.abstract'
import { ClinicAbstractRepository } from '../repositories/clinic.abstract.repository'

export class FindFirstClinicUseCase extends UseCaseFirstAbstract<ClinicAbstractRepository> {
  async execute(id: string) {
    const result = await this.repository.findFirst(id)
    return { data: result }
  }
}
