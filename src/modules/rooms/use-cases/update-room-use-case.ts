import { RoomInput, RoomOutput } from '@/modules/rooms/prisma/entities/room'
import { RoomsRepository } from '@/modules/rooms/prisma/repositories/room-repository'

export class UpdateRoomUseCase implements UpdateRoomUseCaseInterface {
  constructor(protected readonly repository: RoomsRepository) {}

  async execute(id: string, input: RoomInput): Promise<{ data: RoomOutput }> {
    const result = await this.repository.update(id, input)

    return { data: result }
  }
}

export interface UpdateRoomUseCaseInterface {
  execute(id: string, input: RoomInput): Promise<{ data: RoomOutput }>
}
