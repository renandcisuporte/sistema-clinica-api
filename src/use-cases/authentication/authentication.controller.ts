import { AuthenticationUseCaseInterface } from '@/use-cases/authentication/authentication.interface'
import { Request, Response } from 'express'

export class AuthenticationController {
  constructor(protected readonly useCase: AuthenticationUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const result = await this.useCase.execute(body)
    return res.status(201).json(result)
  }
}
