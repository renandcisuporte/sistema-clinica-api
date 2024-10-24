import { RoomsRepository } from '@/domain/inferfaces/repositories/room-repository'

export class ActiveInativeRoomUseCase {
  constructor(private readonly repository: RoomsRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.activeInative(id)
  }
}
