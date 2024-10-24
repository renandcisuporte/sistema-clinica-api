import { UpdateUseCaseInterface } from '@/common/use-case.interface'
import { RoomInterface } from '@/domain/entities/rooms'
import { RoomsRepositoryInterface } from '@/repositories/rooms.interface'

export class UpdateRoomsUseCase implements UpdateUseCaseInterface {
  constructor(protected readonly repository: RoomsRepositoryInterface) {}

  async execute(id: string, input: any): Promise<{ data: RoomInterface }> {
    const res = await this.repository.update(id, input)
    return { data: { ...res } }
  }
}
