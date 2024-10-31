import { RoomsRepository } from '@/modules/rooms/prisma/repositories/room-repository'

export class DeleteRoomUseCase implements DeleteRoomUseCaseInterface {
  constructor(protected readonly repository: RoomsRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export interface DeleteRoomUseCaseInterface {
  execute(id: string): Promise<void>
}
