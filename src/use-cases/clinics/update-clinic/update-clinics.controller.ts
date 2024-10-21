import { ControllerInterface } from '@/common/controller.interface'
import { UpdateUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class UpdateClinicsController implements ControllerInterface {
  constructor(protected readonly useCase: UpdateUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { body, clinicId } = req
    body.clinicId = clinicId

    const resp = await this.useCase.execute(id, { ...body })
    return res.status(200).json(resp)
  }
}
