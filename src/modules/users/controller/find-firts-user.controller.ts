import { FirstControllerAbstract } from '@/common/abstracts/controller.abstract'
import { Request, Response } from 'express'
import { Get, Route, Tags } from 'tsoa'

@Tags('User')
@Route('user')
export class FindFirstUserController extends FirstControllerAbstract {
  @Get(':id')
  async handle(request: Request, response: Response) {
    const { code } = request.params
    const resp = await this.useCase.execute({ code })
    return response.json(resp)
  }
}
