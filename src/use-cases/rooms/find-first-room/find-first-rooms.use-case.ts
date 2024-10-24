import { RoomInterface } from '@/domain/entities/rooms'
import { RoomsRepositoryInterface } from '@/repositories/rooms.interface'

export class FindFirstRoomsUseCase {
  constructor(protected readonly repository: RoomsRepositoryInterface) {}

  async execute(args: any): Promise<{ data: RoomInterface | null }> {
    const { id } = args
    const result = await this.repository.first({ id })
    return {
      data: result
    }
  }
}
