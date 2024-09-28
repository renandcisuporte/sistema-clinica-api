import { CreateControllerAbstract } from '@/common/abstracts/controller.abstract'
import { Request, Response } from 'express'

export class CreateUserController extends CreateControllerAbstract {
  async handle(req: Request, resp: Response): Promise<Response> {
    const result = await this.useCase.execute(req.body)
    return resp.status(201).json(result)
  }
}
