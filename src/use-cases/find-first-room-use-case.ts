import { RoomOutput } from '@/domain/entities/room'
import { RoomsRepository } from '@/domain/inferfaces/repositories/room-repository'

type Output = {
  data: RoomOutput | null
}

export class FindFirstRoomUseCase {
  constructor(protected readonly repository: RoomsRepository) {}

  async execute(id: string): Promise<Output> {
    const result = await this.repository.first(id)
    return {
      data: result
    }
  }
}
