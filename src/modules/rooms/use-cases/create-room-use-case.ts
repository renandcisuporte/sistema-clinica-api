import { RoomInput, RoomOutput } from '@/modules/rooms/prisma/entities/room'
import { RoomsRepository } from '@/modules/rooms/prisma/repositories/room-repository'

export class CreateRoomUseCase implements CreateRoomUseCaseInterface {
  constructor(protected readonly repository: RoomsRepository) {}

  async execute(input: RoomInput): Promise<{ data: RoomOutput }> {
    const result = await this.repository.create(input)

    return { data: result }
  }
}

export interface CreateRoomUseCaseInterface {
  execute(input: RoomInput): Promise<{ data: RoomOutput }>
}
