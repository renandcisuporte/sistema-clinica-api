import { CreateUseCaseInterface } from '@/common/use-case.interface'
import { RoomInterface } from '@/domain/entities/rooms'
import { RoomsRepositoryInterface } from '@/repositories/rooms.interface'

export class CreateRoomsUseCase implements CreateUseCaseInterface {
  constructor(protected readonly repository: RoomsRepositoryInterface) {}

  async execute(input: RoomInterface): Promise<{ data: RoomInterface }> {
    const result = await this.repository.create(input)
    return { data: { ...result } }
  }
}
