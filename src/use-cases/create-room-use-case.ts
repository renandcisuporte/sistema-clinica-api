import { RoomInput, RoomOutput } from '@/domain/entities/room'
import { RoomsRepository } from '@/domain/inferfaces/repositories/room-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

export class CreateRoomUseCase
  implements UseCase<RoomInput, { data: RoomOutput }>
{
  constructor(protected readonly repository: RoomsRepository) {}

  async execute(input: RoomInput): Promise<{ data: RoomOutput }> {
    const result = await this.repository.create(input)

    return { data: result }
  }
}
