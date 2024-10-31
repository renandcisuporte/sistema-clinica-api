import { PeopleController } from '@/modules/peoples/controllers/people-controller'
import { PeopleRepositoryImp } from '@/modules/peoples/prisma/repositories/implementation/people-repository'
import { ActiveInativePeopleUseCase } from '@/modules/peoples/use-cases/active-inative-people-use-case'
import { CreatePeopleUseCase } from '@/modules/peoples/use-cases/create-people-use-case'
import { DeletePeopleUseCase } from '@/modules/peoples/use-cases/delete-people-use-case'
import { FindAllPeopleUseCase } from '@/modules/peoples/use-cases/find-all-people-use-case'
import { FindFirstPeopleUseCase } from '@/modules/peoples/use-cases/find-first-people-use-case'
import { ShowActiveInativePeopleUseCase } from '@/modules/peoples/use-cases/show-active-inative-people-use-case'
import { UpdatePeopleUseCase } from '@/modules/peoples/use-cases/update-people-use-case'
import { validated } from '@/shared/http/middlewares/validated'
import {
  createPeopleSchema,
  paramIdPeopleSchema,
  updatePeopleSchema
} from '@/shared/http/routes/schemas/validations/people-schema'
import prisma from '@/shared/prisma'
import { Router } from 'express'

export const peopleRouter = Router()

const peopleRepository = new PeopleRepositoryImp(prisma)
const createPeopleUseCase = new CreatePeopleUseCase(peopleRepository)
const updatePeopleUseCase = new UpdatePeopleUseCase(peopleRepository)
const deletePeopleUseCase = new DeletePeopleUseCase(peopleRepository)
const findAllPeopleUseCase = new FindAllPeopleUseCase(peopleRepository)
const findFirstPeopleUseCase = new FindFirstPeopleUseCase(peopleRepository)
const activeInativePeopleUseCase = new ActiveInativePeopleUseCase(
  peopleRepository
)
const showActiveInativePeopleUseCase = new ShowActiveInativePeopleUseCase(
  peopleRepository
)

const peopleController = new PeopleController(
  findAllPeopleUseCase,
  findFirstPeopleUseCase,
  createPeopleUseCase,
  updatePeopleUseCase,
  deletePeopleUseCase,
  activeInativePeopleUseCase,
  showActiveInativePeopleUseCase
)

peopleRouter.get('/', async (req, res) => await peopleController.all(req, res))

peopleRouter.get(
  '/active-inative',
  async (req, res) => await peopleController.showActiveInative(req, res)
)

peopleRouter.get(
  '/:id',
  validated(paramIdPeopleSchema),
  async (req, res) => await peopleController.findFirst(req, res)
)

peopleRouter.post(
  '/',
  validated(createPeopleSchema),
  async (req, res) => await peopleController.create(req, res)
)

peopleRouter.put(
  '/:id',
  validated(updatePeopleSchema),
  async (req, res) => await peopleController.update(req, res)
)

peopleRouter.put(
  '/:id/active-inative',
  validated(paramIdPeopleSchema),
  async (req, res) => await peopleController.activeInative(req, res)
)

peopleRouter.delete(
  '/:id',
  validated(paramIdPeopleSchema),
  async (req, res) => await peopleController.delete(req, res)
)
