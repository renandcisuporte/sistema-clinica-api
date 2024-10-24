import { RoomInput, RoomOutput } from '@/domain/entities/room'
import { RoomsRepository } from '@/domain/inferfaces/repositories/room-repository'
import { PrismaClient } from '@prisma/client'

export class RoomRepositoryImp implements RoomsRepository {
  constructor(protected readonly db: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.db.room.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() }
    })
  }

  async update(id: string, input: RoomInput): Promise<RoomOutput> {
    const result = await this.db.room.update({
      where: { id, deletedAt: null },
      data: {
        ...input
      }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async create(input: RoomInput): Promise<RoomOutput> {
    const result = await this.db.room.create({
      data: { ...input }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async first(id: string): Promise<RoomOutput | null> {
    const result = await this.db.room.findUnique({
      where: { id, deletedAt: null }
    })

    if (!result) return null

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async count(args: Record<string, any>): Promise<number> {
    const where: Record<string, any> = { deletedAt: null }
    const conditions: Record<string, any> = []

    const { room, clinicId } = args
    if (room) conditions.push({ room: { contains: room } })
    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    where.clinicId = clinicId
    return this.db.room.count({
      where: { ...where }
    })
  }

  async activeInative(id: string): Promise<void> {
    const result = await this.db.room.findUnique({
      where: { id, deletedAt: null },
      select: { active: true }
    })

    await this.db.room.update({
      where: { id },
      data: { active: !result?.active }
    })
  }

  async all(args: Record<string, any>): Promise<RoomOutput[]> {
    const where: Record<string, any> = { deletedAt: null }
    const conditions: Record<string, any> = []

    const { room, clinicId, limit = 15, page = 1 } = args

    if (room) conditions.push({ room: { contains: room } })
    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    where.clinicId = clinicId
    const result = await this.db.room.findMany({
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit)
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }
}
