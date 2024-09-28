import { FirstControllerAbstract } from '@/common/abstracts/controller.abstract'
import { Request as ExpRequest, Response as ExpResponse } from 'express'
import { Post, Route, Tags } from 'tsoa'

@Tags('/Auth')
@Route('/user/authentication')
export class AuthController extends FirstControllerAbstract {
  @Post()
  async handle(req: ExpRequest, resp: ExpResponse): Promise<ExpResponse> {
    const { email, password } = req.body

    const result = await this.useCase.execute({ email, password })
    return resp.status(201).json(result)
  }
}
