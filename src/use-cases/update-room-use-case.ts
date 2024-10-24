import { RoomInput, RoomOutput } from '@/domain/entities/room'
import { RoomsRepository } from '@/domain/inferfaces/repositories/room-repository'

export class UpdateRoomUseCase {
  constructor(protected readonly repository: RoomsRepository) {}

  async execute(id: string, input: RoomInput): Promise<{ data: RoomOutput }> {
    const result = await this.repository.update(id, input)

    return { data: result }
  }
}
