import { ChartsInterface } from '@/entities/charts'

export interface ChartRepositoryInterface {
  chart(clinicId: string): Promise<ChartsInterface[]>
}
