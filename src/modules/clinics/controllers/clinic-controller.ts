import { AverageServiceClinicUseCaseInterface } from '@/modules/clinics/use-cases/average-service-clinic-use-case'
import { CreateClinicUseCaseInterface } from '@/modules/clinics/use-cases/create-clinic-use-case'
import { DeleteClinicUseCaseInterface } from '@/modules/clinics/use-cases/delete-clinic-use-case'
import { FindAllClinicUseCaseInterface } from '@/modules/clinics/use-cases/find-all-clinic-use-case'
import { FindFirstClinicUseCaseInterface } from '@/modules/clinics/use-cases/find-first-clinic-use-case'
import { UpdateClinicUseCaseInterface } from '@/modules/clinics/use-cases/update-clinic-use-case'
import { Request, Response } from 'express'

export class ClinicController {
  constructor(
    private readonly allUseCase: FindAllClinicUseCaseInterface,
    private readonly findFirstUseCase: FindFirstClinicUseCaseInterface,
    private readonly createUseCase: CreateClinicUseCaseInterface,
    private readonly updateUseCase: UpdateClinicUseCaseInterface,
    private readonly deleteUseCase: DeleteClinicUseCaseInterface,
    private readonly updateAaverageUseCase: AverageServiceClinicUseCaseInterface
  ) {}

  async all(req: Request, res: Response) {
    const { query } = req
    const resutl = await this.allUseCase.execute(query as any)
    return res.status(200).json(resutl)
  }

  async findFirst(req: Request, res: Response) {
    const { id } = req.params
    const resutl = await this.findFirstUseCase.execute(id)
    return res.status(200).json(resutl)
  }

  async create(req: Request, res: Response) {
    const { body } = req
    const resutl = await this.createUseCase.execute(body)

    return res.status(201).json(resutl)
  }

  async averageUseCase(req: Request, res: Response) {
    const { id } = req.params
    const { time } = req.body
    const resutl = await this.updateAaverageUseCase.execute(id, time)
    return res.status(200).json(resutl)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { body } = req
    const resutl = await this.updateUseCase.execute({ id, input: body })
    return res.status(200).json(resutl)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const resutl = await this.deleteUseCase.execute(id)
    return res.status(200).json(resutl)
  }
}
