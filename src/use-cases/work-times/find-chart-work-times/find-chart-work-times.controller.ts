import { ControllerInterface } from '@/common/controller.interface'
import { AllUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class FindChartWorkTimesController implements ControllerInterface {
  constructor(protected readonly useCase: AllUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const resp = await this.useCase.execute(userId)
    return res.status(200).json(resp)
  }
}
