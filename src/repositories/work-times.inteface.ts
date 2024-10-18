import { WorkTimeInterface } from '@/entities/work-times'

export interface WorkTimesRepositoryInterface {
  all(clinicId: string): Promise<WorkTimeInterface[] | null>
  create(input: any): Promise<WorkTimeInterface>
  delete(...args: any): Promise<void>
}
