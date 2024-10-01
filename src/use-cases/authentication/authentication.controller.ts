import { Request, Response } from 'express'
import { AuthenticationUseCaseInterface } from './authentication-interface'

export class AuthenticationController {
  constructor(protected readonly useCase: AuthenticationUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const result = await this.useCase.execute(body)
    return res.status(201).json(result)
  }
}
