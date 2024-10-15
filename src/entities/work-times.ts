import { WorkTime as WorkTimePrisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export interface WorkTimeInterface extends InstanceType<typeof WorkTime> {}

export class WorkTime implements Omit<WorkTimePrisma, 'deletedAt'> {
  createdAt!: Date
  updatedAt!: Date
  id!: string
  clinicId!: string | null
  week!: string
  times!: string | null
  open!: boolean

  constructor(
    props: Omit<WorkTime, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: string
  ) {
    Object.assign(this, props)
    if (!id) {
      this.id = randomUUID()
    }
  }
}
