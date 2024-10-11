import { Room as RoomPrisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export interface RoomInterface extends InstanceType<typeof Room> {}

export class Room implements Omit<RoomPrisma, 'deletedAt'> {
  public createdAt!: Date
  public updatedAt!: Date
  public id!: string
  public room!: string
  public clinicId!: string | null
  public description!: string | null

  constructor(
    props: Omit<Room, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: string
  ) {
    Object.assign(this, props)
    if (!id) {
      this.id = randomUUID()
    }
  }
}
