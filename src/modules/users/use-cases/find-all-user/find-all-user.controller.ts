import { ControllerAbstract } from '@/common/abstracts/controller.abstract'
import { Response } from 'express'
import { Get, Route, Tags } from 'tsoa'

@Tags('User')
@Route('/user')
export class FindAllUserController extends ControllerAbstract {
  @Get()
  async handle(_: any, resp: Response): Promise<Response> {
    const result = await this.useCase.execute()
    return resp.status(200).json(result)
  }
}
