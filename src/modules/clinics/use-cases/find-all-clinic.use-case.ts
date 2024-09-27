import { UseCaseAbstract } from '@/common/abstracts/use-cases.abstract'
import { Clinic } from '@prisma/client'

type Common = {
  data: Clinic[]
}

export class FindAllClinicUseCase extends UseCaseAbstract {
  async execute(id: string) {
    const result = await this.repository.findAll({ id })
    return { data: result }
  }
}
