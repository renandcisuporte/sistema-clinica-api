import prisma from '@/database/prisma'
import { ClinicRepositoryImp } from '@/domain/repositories/clinic-repository'
import { CreateClinicUseCase } from '@/use-cases/create-clinic-use-case'
import { DeleteClinicUseCase } from '@/use-cases/delete-clinic-use-case'
import { FindAllClinicUseCase } from '@/use-cases/find-all-clinic-use-case'
import { FindFirstClinicUseCase } from '@/use-cases/find-first-clinic-use-case'
import { UpdateClinicUseCase } from '@/use-cases/update-clinic-use-case'
import { Router } from 'express'
import { validated } from '../http/middleware/validated'
import {
  createClinicSchema,
  idSchema,
  updateClinicSchema
} from '../http/schemas/validations/clinic-schema'

export const clinicRouter = Router()

const clinicRepository = new ClinicRepositoryImp(prisma)

const createClinicUseCase = new CreateClinicUseCase(clinicRepository)
const updateClinicUseCase = new UpdateClinicUseCase(clinicRepository)
const deleteClinicUseCase = new DeleteClinicUseCase(clinicRepository)
const findAllClinicUseCase = new FindAllClinicUseCase(clinicRepository)
const findFirstClinicUseCase = new FindFirstClinicUseCase(clinicRepository)

clinicRouter.get('/', async (req, res) => {
  const { query } = req
  const resutl = await findAllClinicUseCase.execute(query as any)
  return res.status(200).json(resutl)
})

clinicRouter.get('/:id', validated(idSchema), async (req, res) => {
  const { id } = req.params
  const resutl = await findFirstClinicUseCase.execute(id)
  return res.status(200).json(resutl)
})

clinicRouter.post('/', validated(createClinicSchema), async (req, res) => {
  const { body } = req
  const resutl = await createClinicUseCase.execute(body)
  return res.status(201).json(resutl)
})

clinicRouter.put('/:id', validated(updateClinicSchema), async (req, res) => {
  const { id } = req.params
  const { body } = req
  const resutl = await updateClinicUseCase.execute({ id, input: body })
  return res.status(200).json(resutl)
})

clinicRouter.delete('/:id', validated(idSchema), async (req, res) => {
  const { id } = req.params
  await deleteClinicUseCase.execute(id)
  return res.status(204).json()
})
