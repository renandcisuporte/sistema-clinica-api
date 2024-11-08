import {
  RealeseInput,
  RealeseOutput
} from '@/modules/realeses/prisma/entities/realese'

export interface RealeseRepository {
  count(...args: any): Promise<number>
  all(...args: any): Promise<RealeseOutput[]>
  first(id: string): Promise<RealeseOutput | null>
  create(input: RealeseInput): Promise<RealeseOutput>
  update(id: string, input: RealeseInput): Promise<RealeseOutput>
  delete(id: string): Promise<void>
  upsave(args: RealeseInput): Promise<void>
}
