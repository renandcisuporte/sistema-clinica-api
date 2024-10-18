import { ClinicInterface } from '@/entities/clinics'

export interface ClinicsRepositoryInterface {
  all(...args: any): Promise<{
    data: ClinicInterface[]
    total: number
  }>
  first(...args: any): Promise<ClinicInterface | null>
  create(input: ClinicInterface): Promise<ClinicInterface>
  update(id: string, input: ClinicInterface): Promise<ClinicInterface>
  delete(...args: any): Promise<void>
}
