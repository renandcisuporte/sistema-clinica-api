import { AllUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class FindAllClinicsController {
  constructor(protected readonly useCase: AllUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { params } = req
    const result = await this.useCase.execute(params)
    return res.status(201).json(result)
  }
}
