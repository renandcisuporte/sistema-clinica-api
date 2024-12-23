import { CreateProductUseCaseInterface } from '@/modules/products/use-cases/create-product-use-case'
import { DeleteProductUseCaseInterface } from '@/modules/products/use-cases/delete-product-use-case'
import { FindAllProductUseCaseInterface } from '@/modules/products/use-cases/find-all-product-use-case'
import { FindFirstProductUseCaseInterface } from '@/modules/products/use-cases/find-first-product-use-case'
import { UpdateProductUseCaseInterface } from '@/modules/products/use-cases/update-product-use-case'
import { Request, Response } from 'express'

export class ProductController {
  constructor(
    private readonly findAllUseCase: FindAllProductUseCaseInterface,
    private readonly findFirstUseCase: FindFirstProductUseCaseInterface,
    private readonly createUseCase: CreateProductUseCaseInterface,
    private readonly updateUseCase: UpdateProductUseCaseInterface,
    private readonly deleteUseCase: DeleteProductUseCaseInterface
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
