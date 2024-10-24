import { WorkTime } from '@prisma/client'

export type WorkTimeInput = Pick<
  WorkTime,
  'clinicId' | 'week' | 'times' | 'open'
>

export type WorkTimeOutput = Omit<WorkTime, 'deletedAt'>
