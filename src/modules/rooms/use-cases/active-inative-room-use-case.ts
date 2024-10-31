import { RoomsRepository } from '@/modules/rooms/prisma/repositories/room-repository'

export class ActiveInativeRoomUseCase
  implements ActiveInativeRoomUseCaseInterface
{
  constructor(private readonly repository: RoomsRepository) {}

  async execute(id: string): Promise<unknown> {
    await this.repository.activeInative(id)
    return { data: { message: 'Atualizado com sucesso!' } }
  }
}

export interface ActiveInativeRoomUseCaseInterface {
  execute(id: string): Promise<unknown>
}
