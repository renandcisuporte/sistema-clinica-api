import { RoomOutput } from '@/modules/rooms/prisma/entities/room'
import { RoomsRepository } from '@/modules/rooms/prisma/repositories/room-repository'

type Output = {
  data: RoomOutput | null
}

export class FindFirstRoomUseCase implements FindFirstRoomUseCaseInterface {
  constructor(protected readonly repository: RoomsRepository) {}

  async execute(id: string): Promise<Output> {
    const result = await this.repository.first(id)
    return {
      data: result
    }
  }
}

export interface FindFirstRoomUseCaseInterface {
  execute(id: string): Promise<Output>
}
