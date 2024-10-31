import {
  ClinicInput,
  ClinicOutput
} from '@/modules/clinics/prisma/entities/clinic'

export interface ClinicRepository {
  averageService(id: string, time: string): Promise<string>
  findByCode(code: string): Promise<string | null>
  findAll(...args: any): Promise<{ data: ClinicOutput[]; total: number }>
  findFirst(id: string): Promise<ClinicOutput | null>
  create(input: ClinicInput): Promise<ClinicOutput>
  update(id: string, input: ClinicInput): Promise<ClinicOutput>
  delete(id: string): Promise<void>
}
