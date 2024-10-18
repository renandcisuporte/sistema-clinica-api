import { RoomInterface } from '@/entities/rooms'
import { RoomsRepositoryInterface } from '@/repositories/rooms.interface'

export class FindAllRoomsUseCase {
  constructor(protected readonly repository: RoomsRepositoryInterface) {}

  async execute(args: any): Promise<{ data: RoomInterface[]; total: number }> {
    const { userId, title, fantasy, cnpj, limit, page } = args
    const { total, data } = await this.repository.all({
      userId,
      title,
      fantasy,
      cnpj,
      limit,
      page
    })
    return {
      total,
      data
    }
  }
}
