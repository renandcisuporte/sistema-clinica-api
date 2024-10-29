import prisma from '@/database/prisma'
import { ChartRepositoryImp } from '@/domain/repositories/chart-repository'
import { ClinicRepositoryImp } from '@/domain/repositories/clinic-repository'
import { PeopleRepositoryImp } from '@/domain/repositories/people-repository'
import { RoomRepositoryImp } from '@/domain/repositories/room-repository'
import { ChartController } from '@/infra/http/controllers/chart-controller'
import { FindFirstChartUseCase } from '@/use-cases/find-first-chart-use-case'
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
