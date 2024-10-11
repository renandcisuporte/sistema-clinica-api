import { FirstUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class FindFirstClinicsController {
  constructor(protected readonly useCase: FirstUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const { id } = req.params
    const result = await this.useCase.execute({ id, userId })
    return res.status(201).json(result)
  }
}
