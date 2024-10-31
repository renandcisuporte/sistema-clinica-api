import { ChartController } from '@/modules/chart/controllers/chart-controller'
import { ChartRepositoryImp } from '@/modules/chart/prisma/repositories/implementation/chart-repository'
import { FindFirstChartUseCase } from '@/modules/chart/use-cases/find-first-chart-use-case'
import { ClinicRepositoryImp } from '@/modules/clinics/prisma/repositories/implementation/clinic-repository'
import { PeopleRepositoryImp } from '@/modules/peoples/prisma/repositories/implementation/people-repository'
import { RoomRepositoryImp } from '@/modules/rooms/prisma/repositories/implementation/room-repository'
import prisma from '@/shared/prisma'
import { Router } from 'express'

export const chartRouter = Router()

const chartRepository = new ChartRepositoryImp(prisma)
const peopleRepository = new PeopleRepositoryImp(prisma)
const roomRepository = new RoomRepositoryImp(prisma)
const clinicRepository = new ClinicRepositoryImp(prisma)
const findFirstChartUseCase = new FindFirstChartUseCase(
  chartRepository,
  peopleRepository,
  roomRepository,
  clinicRepository
)

const chartController = new ChartController(findFirstChartUseCase)

chartRouter.get(
  '/charts',
  async (req, res) => await chartController.handle(req, res)
)
