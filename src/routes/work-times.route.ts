import { validated } from '@/middleware/validated'
import {
  createRoomSchema,
  deleteOrFirstRoomSchema,
  updateRoomSchema
} from '@/schemas/rooms.schema'
import {
  createRoomsController,
  deleteRoomsController,
  findFirstRoomsController,
  updateRoomsController
} from '@/use-cases/rooms'
import { Router } from 'express'

export const workTimesRouter = Router()

workTimesRouter
  .get('/:id', validated(deleteOrFirstRoomSchema), (req, rep) =>
    findFirstRoomsController.handle(req, rep)
  )
  .post('/:id', validated(createRoomSchema), (req, rep) =>
    createRoomsController.handle(req, rep)
  )
  .put('/:id/:idWorkTime', validated(updateRoomSchema), (req, rep) =>
    updateRoomsController.handle(req, rep)
  )
  .delete('/:id/:idWorkTime', validated(deleteOrFirstRoomSchema), (req, rep) =>
    deleteRoomsController.handle(req, rep)
  )
