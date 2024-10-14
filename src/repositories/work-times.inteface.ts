import { WorkTimeInterface } from '@/entities/work-times'

export interface WorkTimesRepositoryInterface {
  first(input: any): Promise<WorkTimeInterface | null>
  create(input: any): Promise<WorkTimeInterface>
  update(id: string, input: any): Promise<WorkTimeInterface>
  delete(...args: any): Promise<void>
}
