import { ClinicInterface } from '@/entities/clinics'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class FindAllClinicsUseCase {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(
    args: any
  ): Promise<{ data: ClinicInterface[]; total: number }> {
    const { userId, title, fantasy, cnpj, limit, page } = args
    const { total, data } = await this.repository.all({
      userId,
      title,
      fantasy,
      cnpj,
      limit,
      page
    })
    return {
      total,
      data
    }
  }
}
