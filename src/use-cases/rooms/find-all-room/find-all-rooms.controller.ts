import { AllUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class FindAllRoomsController {
  constructor(protected readonly useCase: AllUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { room, limit, page } = req.query
    const result = await this.useCase.execute({
      room,
      limit,
      page
    })

    return res.status(200).json(result)
  }
}
