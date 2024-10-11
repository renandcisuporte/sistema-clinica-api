import { FirstUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class FindFirstRoomsController {
  constructor(protected readonly useCase: FirstUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const result = await this.useCase.execute({ id })
    return res.status(200).json(result)
  }
}
