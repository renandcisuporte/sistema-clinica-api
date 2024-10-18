import prisma from '@/database/prisma'
import { RoomsRepository } from '@/repositories/implementation/rooms.repository'
import { CreateRoomsController } from '@/use-cases/rooms/create-room/create-rooms.controller'
import { CreateRoomsUseCase } from '@/use-cases/rooms/create-room/create-rooms.use-case'
import { DeleteRoomsController } from '@/use-cases/rooms/delete-room/delete-rooms.controller'
import { DeleteRoomsUseCase } from '@/use-cases/rooms/delete-room/delete-rooms.use-case'
import { FindAllRoomsController } from '@/use-cases/rooms/find-all-room/find-all-rooms.controller'
import { FindAllRoomsUseCase } from '@/use-cases/rooms/find-all-room/find-all-rooms.use-case'
import { FindFirstRoomsController } from '@/use-cases/rooms/find-first-room/find-first-rooms.controller'
import { FindFirstRoomsUseCase } from '@/use-cases/rooms/find-first-room/find-first-rooms.use-case'
import { UpdateRoomsController } from '@/use-cases/rooms/update-room/update-rooms.controller'
import { UpdateRoomsUseCase } from '@/use-cases/rooms/update-room/update-rooms.use-case'

const roomsRepository = new RoomsRepository(prisma)

// all rooms
const findAllRoomsController = new FindAllRoomsController(
  new FindAllRoomsUseCase(roomsRepository)
)

// first rooms
const findFirstRoomsController = new FindFirstRoomsController(
  new FindFirstRoomsUseCase(roomsRepository)
)

// create rooms
const createRoomsController = new CreateRoomsController(
  new CreateRoomsUseCase(roomsRepository)
)

// update rooms
const updateRoomsController = new UpdateRoomsController(
  new UpdateRoomsUseCase(roomsRepository)
)

// delte rooms
const deleteRoomsController = new DeleteRoomsController(
  new DeleteRoomsUseCase(roomsRepository)
)

export {
  createRoomsController,
  deleteRoomsController,
  findAllRoomsController,
  findFirstRoomsController,
  updateRoomsController
}
