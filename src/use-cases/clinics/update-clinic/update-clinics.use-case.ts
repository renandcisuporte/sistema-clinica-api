import { AppError } from '@/common/app.error'
import { UpdateUseCaseInterface } from '@/common/use-case.interface'
import { ClinicInput, ClinicOutput } from '@/entities/clinics'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class UpdateClinicsUseCase implements UpdateUseCaseInterface {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(
    id: string,
    input: ClinicInput
  ): Promise<{ data: ClinicOutput }> {
    if (id !== input.clinicId) throw new AppError('Clinica inválida.')

    const {
      cnpj,
      fantasy,
      title,
      address,
      city,
      clinicId,
      complement,
      ie,
      mobilePhone,
      neighborhood,
      number,
      phone,
      reference,
      state
    } = input
    const res = await this.repository.update(id, {
      cnpj,
      fantasy,
      title,
      address,
      city,
      clinicId,
      complement,
      ie,
      mobilePhone,
      neighborhood,
      number,
      phone,
      reference,
      state
    })
    return { data: { ...res } }
  }
}
