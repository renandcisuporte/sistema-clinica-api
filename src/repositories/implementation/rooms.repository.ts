import { RoomInterface } from '@/entities/rooms'
import { RoomsRepositoryInterface } from '@/repositories/rooms.interface'
import { PrismaClient } from '@prisma/client'

export class RoomsRepository implements RoomsRepositoryInterface {
  constructor(protected readonly db: PrismaClient) {}

  async delete(args: any): Promise<void> {
    const { id } = args
    await this.db.room.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() }
    })
  }

  async update(id: string, input: RoomInterface): Promise<RoomInterface> {
    const { createdAt, updatedAt, ...restInput } = input
    const res = await this.db.room.update({
      where: { id, deletedAt: null },
      data: {
        ...restInput
      }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async create(input: RoomInterface): Promise<RoomInterface> {
    const { id, createdAt, updatedAt, ...restInput } = input
    const res = await this.db.room.create({
      data: {
        ...restInput
      }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async first(args: any): Promise<RoomInterface | null> {
    const { id } = args
    const res = await this.db.room.findUnique({
      where: { id, deletedAt: null }
    })
    if (!res) return null
    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async all(args: any): Promise<{ data: RoomInterface[]; total: number }> {
    const where: any = {}
    const conditions: any = []

    const { room, limit = 15, page = 1 } = args

    if (room) conditions.push({ room: { contains: room } })
    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const [total, data] = await this.db.$transaction([
      this.db.room.count({
        where: { deletedAt: null, ...where }
      }),
      this.db.room.findMany({
        where: { deletedAt: null, ...where },
        skip: Number((page - 1) * limit),
        take: Number(limit)
      })
    ])

    return {
      data: data.map((item) => {
        const { deletedAt, ...rest } = item
        return { ...rest }
      }),
      total
    }
  }
}
