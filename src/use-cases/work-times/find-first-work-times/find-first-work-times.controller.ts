import { FirstUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class FindFirstWorkTimesController {
  constructor(protected readonly useCase: FirstUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const { id: clinicId } = req.params
    const result = await this.useCase.execute({ userId, clinicId })
    return res.status(200).json(result)
  }
}
