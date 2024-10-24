import { RoomInterface } from '@/domain/entities/rooms'

export interface RoomsRepositoryInterface {
  all(...args: any): Promise<{
    data: RoomInterface[]
    total: number
  }>
  first(...args: any): Promise<RoomInterface | null>
  create(input: RoomInterface): Promise<RoomInterface>
  update(id: string, input: RoomInterface): Promise<RoomInterface>
  delete(...args: any): Promise<void>
}
