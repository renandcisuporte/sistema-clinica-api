import { CreateUserUseCase } from '@/use-cases/create-user-use-case'
import { Request, Response } from 'express'

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(req: Request, res: Response) {
    const { body } = req
    const user = await this.createUserUseCase.execute(body)
    res.status(201).json({ data: user })
  }

  async resetForgetPassword(req: Request, res: Response) {
    const { body } = req
    const user = await this.createUserUseCase.execute(body)
    res.status(201).json({ data: user })
  }
}
