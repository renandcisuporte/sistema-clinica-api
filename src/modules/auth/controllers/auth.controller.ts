import { ControllerInterface } from '@/common/interfaces/controller.interface'
import { FirstUseCaseInterface } from '@/common/interfaces/use-case.interface'
import { Request, Response } from 'express'
import { Controller, Post, Route, Tags } from 'tsoa'

@Tags('/Auth')
@Route('/auth')
export class AuthController extends Controller implements ControllerInterface {
  constructor(protected readonly useCase: FirstUseCaseInterface) {
    super()
  }

  @Post()
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const result = await this.useCase.execute({ email, password })
    return res.status(201).json(result)
  }
}
