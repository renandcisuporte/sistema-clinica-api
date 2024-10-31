import {
  WorkTimeInput,
  WorkTimeOutput
} from '@/modules/work-times/prisma/entities/work-time'

export interface WorkTimeRepository {
  averageWorkingTime(clinicId: string): Promise<WorkTimeOutput[]>
  recommendedAverageTime(clinicId: string): Promise<WorkTimeOutput[]>
  averageServiceTime(clinicId: string): Promise<WorkTimeOutput[]>
  createWork(input: WorkTimeInput): Promise<WorkTimeOutput>
  createRecommended(input: WorkTimeInput): Promise<WorkTimeOutput>
  createService(input: WorkTimeInput): Promise<WorkTimeOutput>
}
