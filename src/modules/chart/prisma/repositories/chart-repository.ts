import { Chart } from '@/modules/chart/prisma/entities/chart'

export interface ChartRepository {
  chart(clinicId: string): Promise<Chart>
}
