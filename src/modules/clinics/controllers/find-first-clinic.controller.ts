import { ControllerAbstract } from '@/common/abstracts/controller.abstract'
import { Request, Response } from 'express'

export class FindFirstClinicController extends ControllerAbstract {
  async handle(req: Request, resp: Response) {
    const { id } = req.params
    const result = await this.useCase.execute(id)
    return resp.json(result)
  }
}
