import { ControllerInterface } from '@/common/controller.interface'
import { AllUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class ChartController implements ControllerInterface {
  constructor(protected readonly useCase: AllUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { clinicId } = req
    const resp = await this.useCase.execute(clinicId)
    return res.status(200).json(resp)
  }
}
