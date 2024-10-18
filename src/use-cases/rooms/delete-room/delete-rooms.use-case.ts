import { DeleteUseCaseInterface } from '@/common/use-case.interface'
import { RoomsRepositoryInterface } from '@/repositories/rooms.interface'

export class DeleteRoomsUseCase implements DeleteUseCaseInterface {
  constructor(protected readonly repository: RoomsRepositoryInterface) {}

  async execute(args: any): Promise<void> {
    const { id } = args
    await this.repository.delete({ id })
    return
  }
}
