import { ControllerInterface } from '@/common/controller.interface'
import { CreateUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class CreateWorkTimesController implements ControllerInterface {
  constructor(protected readonly useCase: CreateUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { checked, clinicId, time, week } = req.body
    const resp = await this.useCase.execute({ checked, clinicId, time, week })
    return res.status(201).json(resp)
  }
}
