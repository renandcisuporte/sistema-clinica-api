import { ClinicInput, ClinicOutput } from '@/entities/clinics'

export interface ClinicsRepositoryInterface {
  findClinicCode(code: string): Promise<string | null>

  all(...args: any): Promise<{ data: ClinicOutput[]; total: number }>
  first(...args: any): Promise<ClinicOutput | null>
  create(input: ClinicInput): Promise<ClinicOutput>
  update(id: string, input: ClinicInput): Promise<ClinicOutput>
  delete(...args: any): Promise<void>
}
