import { ChartsInterface } from '@/entities/charts'
import { WorkTimeInterface } from '@/entities/work-times'

export interface WorkTimesRepositoryInterface {
  chart(userId: string): Promise<ChartsInterface[]>
  all(clinicId: string): Promise<WorkTimeInterface[] | null>
  create(input: any): Promise<WorkTimeInterface>
  delete(...args: any): Promise<void>
}
