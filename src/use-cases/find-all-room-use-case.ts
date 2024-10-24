import { RoomOutput } from '@/domain/entities/room'
import { RoomsRepository } from '@/domain/inferfaces/repositories/room-repository'

type Output = {
  total: number
  data: RoomOutput[]
}

export class FindAllRoomUseCase {
  constructor(protected readonly repository: RoomsRepository) {}

  async execute(args: any): Promise<Output> {
    const { clinicId, room = '', limit, page } = args

    const common = {
      clinicId,
      room,
      limit,
      page
    }

    const [total, data] = await Promise.all([
      this.repository.count(common),
      this.repository.all(common)
    ])

    return {
      total,
      data
    }
  }
}
