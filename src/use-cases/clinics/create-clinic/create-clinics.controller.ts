import { ControllerInterface } from '@/common/controller.interface'
import { CreateUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class CreateClinicsController implements ControllerInterface {
  constructor(protected readonly useCase: CreateUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { body, clinicId } = req
    const resp = await this.useCase.execute({ clinicId, ...body })
    return res.status(201).json(resp)
  }
}
