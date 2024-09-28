import { AllControllerAbstract } from '@/common/abstracts/controller.abstract'
import { Request, Response } from 'express'
import { Get, Route, Tags } from 'tsoa'

@Tags('User')
@Route('/user')
export class FindAllUserController extends AllControllerAbstract {
  @Get()
  async handle(_req: Request, resp: Response): Promise<Response> {
    const result = await this.useCase.execute()
    return resp.status(200).json(result)
  }
}
