import { Chart } from '@/domain/entities/chart'

export interface ChartRepository {
  chart(clinicId: string): Promise<Chart>
}
