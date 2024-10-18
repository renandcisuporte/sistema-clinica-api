import { AuthenticationRefreshTokenUseCaseInterface } from '@/use-cases/authentication/authentication-refresh-token.interface'
import { Request, Response } from 'express'

export class AuthenticationRefreshTokenController {
  constructor(
    protected readonly useCase: AuthenticationRefreshTokenUseCaseInterface
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.headers
    const result = await this.useCase.execute(id as string)
    return res.status(201).json(result)
  }
}
