import { FirstUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class FindFirstClinicsController {
  constructor(protected readonly useCase: FirstUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { clinicId } = req
    const result = await this.useCase.execute({ id, clinicId })
    return res.status(200).json(result)
  }
}
