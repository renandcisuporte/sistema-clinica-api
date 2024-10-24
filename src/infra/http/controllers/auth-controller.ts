import { AuthRefreshUseCase } from '@/use-cases/auth-refresh-use-case'
import { AuthUseCase } from '@/use-cases/auth-use-case'
import { Request, Response } from 'express'

export class AuthController {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly authRefreshUseCase: AuthRefreshUseCase
  ) {}

  async auth(req: Request, res: Response) {
    const { body } = req
    const result = await this.authUseCase.execute(body)
    return res.status(201).json(result)
  }

  async refreshToken(req: Request, res: Response) {
    const { authorization } = req.headers
    const result = await this.authRefreshUseCase.execute(authorization!)
    return res.status(201).json(result)
  }
}
