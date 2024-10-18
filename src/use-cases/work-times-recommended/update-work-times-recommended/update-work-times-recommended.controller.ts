import { ControllerInterface } from '@/common/controller.interface'
import { UpdateUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class UpdateWorkTimesRecommendedController
  implements ControllerInterface
{
  constructor(protected readonly useCase: UpdateUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { clinicId, ...restBody } = req.body

    const resp = await this.useCase.execute(clinicId, {
      ...restBody
    })

    return res.status(200).json(resp)
  }
}
