import { RoomsRepository } from '@/domain/inferfaces/repositories/room-repository'

export class DeleteRoomUseCase {
  constructor(protected readonly repository: RoomsRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
