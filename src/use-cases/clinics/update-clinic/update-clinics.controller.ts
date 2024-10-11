import { ControllerInterface } from '@/common/controller.interface'
import { UpdateUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class UpdateClinicsController implements ControllerInterface {
  constructor(protected readonly useCase: UpdateUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const { id } = req.params
    const { body } = req

    const resp = await this.useCase.execute(id, { ...body, userId })
    return res.status(200).json(resp)
  }
}
