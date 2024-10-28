import prisma from '@/database/prisma'
import { RoomRepositoryImp } from '@/domain/repositories/room-repository'
import { validated } from '@/infra/http/middlewares/validated'
import {
  createRoomSchema,
  paramsRoomSchema,
  updateRoomSchema
} from '@/infra/http/schemas/validations/room-schema'
import { ActiveInativeRoomUseCase } from '@/use-cases/active-inative-room-use-case'
import { CreateRoomUseCase } from '@/use-cases/create-room-use-case'
import { DeleteRoomUseCase } from '@/use-cases/delete-room-use-case'
import { FindAllRoomUseCase } from '@/use-cases/find-all-room-use-case'
import { FindFirstRoomUseCase } from '@/use-cases/find-first-room-use-case'
import { UpdateRoomUseCase } from '@/use-cases/update-room-use-case'
import { Router } from 'express'
import { RoomController } from '../http/controllers/room-controller'

export const roomRouter = Router()

const roomRepository = new RoomRepositoryImp(prisma)
const findAllRoomUseCase = new FindAllRoomUseCase(roomRepository)
const findFirstRoomUseCase = new FindFirstRoomUseCase(roomRepository)
const createRoomUseCase = new CreateRoomUseCase(roomRepository)
const updateRoomUseCase = new UpdateRoomUseCase(roomRepository)
const deleteRoomUseCase = new DeleteRoomUseCase(roomRepository)
const activeInativeRoomUseCase = new ActiveInativeRoomUseCase(roomRepository)

const roomController = new RoomController(
  findAllRoomUseCase,
  findFirstRoomUseCase,
  createRoomUseCase,
  updateRoomUseCase,
  deleteRoomUseCase,
  activeInativeRoomUseCase
)

roomRouter.get('/', async (req, res) => await roomController.findAll(req, res))

roomRouter.get(
  '/:id',
  validated(paramsRoomSchema),
  async (req, res) => await roomController.findFirst(req, res)
)

roomRouter.post(
  '/',
  validated(createRoomSchema),
  async (req, res) => await roomController.create(req, res)
)

roomRouter.put(
  '/:id',
  validated(updateRoomSchema),
  async (req, res) => await roomController.update(req, res)
)

roomRouter.put(
  '/:id/active-inative',
  validated(paramsRoomSchema),
  async (req, res) => await roomController.activeInative(req, res)
)

roomRouter.delete(
  '/:id',
  validated(paramsRoomSchema),
  async (req, res) => await roomController.delete(req, res)
)
