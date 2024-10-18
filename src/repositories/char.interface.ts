import { ChartsInterface } from '@/entities/charts'

export interface ChartRepositoryInterface {
  chart(userId: string): Promise<ChartsInterface[]>
}
