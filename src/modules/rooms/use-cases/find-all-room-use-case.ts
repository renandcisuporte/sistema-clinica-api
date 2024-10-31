import { RoomOutput } from '@/modules/rooms/prisma/entities/room'
import { RoomsRepository } from '@/modules/rooms/prisma/repositories/room-repository'

type Output = {
  total: number
  active: number
  inative: number
  data: RoomOutput[]
}

export class FindAllRoomUseCase implements FindAllRoomUseCaseInterface {
  constructor(protected readonly repository: RoomsRepository) {}

  async execute(args: any): Promise<Output> {
    const { clinicId, room = '', limit, page } = args

    const common = {
      clinicId,
      room,
      limit,
      page
    }

    const [active, inative, total, data] = await Promise.all([
      this.repository.count({ clinicId, room, active: 'true' }),
      this.repository.count({ clinicId, room, active: 'false' }),
      this.repository.count({ clinicId, room }),
      this.repository.all(common)
    ])

    return {
      active,
      inative,
      total,
      data
    }
  }
}

export interface FindAllRoomUseCaseInterface {
  execute(args: any): Promise<Output>
}
