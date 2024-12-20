import { CreateServiceUseCaseInterface } from '@/modules/services/use-cases/create-service-use-case'
import { DeleteServiceUseCaseInterface } from '@/modules/services/use-cases/delete-service-use-case'
import { FindAllServiceUseCaseInterface } from '@/modules/services/use-cases/find-all-service-use-case'
import { FindFirstServiceUseCaseInterface } from '@/modules/services/use-cases/find-first-service-use-case'
import { UpdateServiceUseCaseInterface } from '@/modules/services/use-cases/update-service-use-case'
import { Request, Response } from 'express'

export class ServiceController {
  constructor(
    private readonly findAllUseCase: FindAllServiceUseCaseInterface,
    private readonly findFirstUseCase: FindFirstServiceUseCaseInterface,
    private readonly createUseCase: CreateServiceUseCaseInterface,
    private readonly updateUseCase: UpdateServiceUseCaseInterface,
    private readonly deleteUseCase: DeleteServiceUseCaseInterface
  ) {}

  async findAll(req: Request, res: Response) {
    const { query, clinicId } = req

    const result = await this.findAllUseCase.execute({ clinicId, ...query })
    return res.status(200).json(result)
  }

  async findFirst(req: Request, res: Response) {
    const { id } = req.params
    const result = await this.findFirstUseCase.execute(id)
    return res.status(200).json(result)
  }

  async create(req: Request, res: Response) {
    const { body } = req
    const { clinicId } = req
    const result = await this.createUseCase.execute({ clinicId, ...body })
    return res.status(201).json(result)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { body } = req
    const result = await this.updateUseCase.execute(id, body)
    return res.status(200).json(result)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const result = await this.deleteUseCase.execute(id)
    return res.status(204).json(result)
  }
}
