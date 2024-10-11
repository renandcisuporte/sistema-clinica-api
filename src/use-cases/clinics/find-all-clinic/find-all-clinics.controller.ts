import { AllUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class FindAllClinicsController {
  constructor(protected readonly useCase: AllUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const { title, fantasy, cnpj, limit, page } = req.query
    const result = await this.useCase.execute({
      userId,
      title,
      fantasy,
      cnpj,
      limit,
      page
    })
    return res.status(200).json(result)
  }
}
