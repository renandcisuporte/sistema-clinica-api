import { validated } from '@/infra/http/middleware/validated'
import {
  createRoomSchema,
  deleteOrFirstRoomSchema,
  updateRoomSchema
} from '@/infra/http/schemas/validations/room-schema'
import {
  createRoomsController,
  deleteRoomsController,
  findAllRoomsController,
  findFirstRoomsController,
  updateRoomsController
} from '@/use-cases/rooms'
import { Router } from 'express'

export const roomsRouter = Router()

roomsRouter
  .get('/', (req, rep) => findAllRoomsController.handle(req, rep))
  .get('/:id', validated(deleteOrFirstRoomSchema), (req, rep) =>
    findFirstRoomsController.handle(req, rep)
  )
  .post('/', validated(createRoomSchema), (req, rep) =>
    createRoomsController.handle(req, rep)
  )
  .put('/:id', validated(updateRoomSchema), (req, rep) =>
    updateRoomsController.handle(req, rep)
  )
  .delete('/:id', validated(deleteOrFirstRoomSchema), (req, rep) =>
    deleteRoomsController.handle(req, rep)
  )
