import { CreateRealeseUseCaseInterface } from '@/modules/realeses/use-cases/create-realese-use-case'
import { DeleteRealeseUseCaseInterface } from '@/modules/realeses/use-cases/delete-realese-use-case'
import { FindAllRealeseUseCaseInterface } from '@/modules/realeses/use-cases/find-all-realese-use-case'
import { FindFirstRealeseUseCaseInterface } from '@/modules/realeses/use-cases/find-first-realese-use-case'
import { UpdateRealeseUseCaseInterface } from '@/modules/realeses/use-cases/update-realese-use-case'
import { Request, Response } from 'express'

export class RealeseController {
  constructor(
    private readonly findAllUseCase: FindAllRealeseUseCaseInterface,
    private readonly findFirstUseCase: FindFirstRealeseUseCaseInterface,
    private readonly createUseCase: CreateRealeseUseCaseInterface,
    private readonly updateUseCase: UpdateRealeseUseCaseInterface,
    private readonly deleteUseCase: DeleteRealeseUseCaseInterface
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
