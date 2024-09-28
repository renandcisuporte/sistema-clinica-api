import { UseCaseAllAbstract } from '@/common/abstracts/use-cases.abstract'
import { ClinicAbstractRepository } from '@/modules/clinics/repositories/clinic.abstract.repository'
import { Clinic } from '@prisma/client'

type Common = {
  data: Clinic[]
}

export class FindAllClinicUseCase extends UseCaseAllAbstract<ClinicAbstractRepository> {
  async execute() {
    const result = await this.repository.findAll()
    return { data: result }
  }
}
