import { CreateServiceInProductUseCaseInterface } from '@/modules/services-in-products/use-cases/create-service-in-product-use-case'
import { DeleteServiceInProductUseCaseInterface } from '@/modules/services-in-products/use-cases/delete-service-in-product-use-case'
import { FindAllServiceInProductUseCaseInterface } from '@/modules/services-in-products/use-cases/find-all-service-in-product-use-case'
import { FindFirstServiceInProductUseCaseInterface } from '@/modules/services-in-products/use-cases/find-first-service-in-product-use-case'
import { UpdateServiceInProductUseCaseInterface } from '@/modules/services-in-products/use-cases/update-service-in-product-use-case'
import { Request, Response } from 'express'

export class ServiceInProductController {
  constructor(
    private readonly findAllUseCase: FindAllServiceInProductUseCaseInterface,
    private readonly findFirstUseCase: FindFirstServiceInProductUseCaseInterface,
    private readonly createUseCase: CreateServiceInProductUseCaseInterface,
    private readonly updateUseCase: UpdateServiceInProductUseCaseInterface,
    private readonly deleteUseCase: DeleteServiceInProductUseCaseInterface
  ) {}

  async findAll(req: Request, res: Response) {
    const { query, clinicId } = req

    const result = await this.findAllUseCase.execute({
      clinicId,
      ...query
    })
    return res.status(200).json(result)
  }

  async findAllService(req: Request, res: Response) {
    const { clinicId } = req
    const { serviceId } = req.params

    const result = await this.findAllUseCase.execute({
      clinicId,
      serviceId
    })
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
    const result = await this.createUseCase.execute(body, clinicId)
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
