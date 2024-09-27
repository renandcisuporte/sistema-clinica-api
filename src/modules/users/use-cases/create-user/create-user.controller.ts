import { ControllerAbstract } from '@/common/abstracts/controller.abstract'
import { Request, Response } from 'express'

export class CreateUserController extends ControllerAbstract {
  async handle(req: Request, resp: Response): Promise<Response> {
    const result = await this.useCase.execute(req.body)
    return resp.status(201).json(result)
  }
}
