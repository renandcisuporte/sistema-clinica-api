import { AppError } from '@/common/app.error'
import { AuthenticationRefreshTokenUseCaseInterface } from '@/use-cases/authentication/authentication-refresh-token.interface'
import { Request, Response } from 'express'

export class AuthenticationRefreshTokenController {
  constructor(
    protected readonly useCase: AuthenticationRefreshTokenUseCaseInterface
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers
    if (!authorization) throw new AppError('Token não informado')

    const result = await this.useCase.execute(authorization)
    return res.status(201).json(result)
  }
}
