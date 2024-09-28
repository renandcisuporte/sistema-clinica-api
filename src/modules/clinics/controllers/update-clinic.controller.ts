import { UpdateControllerAbstract } from '@/common/abstracts/controller.abstract'
import { Request, Response } from 'express'

export class UpdateClinicController extends UpdateControllerAbstract {
  async handle(req: Request, resp: Response) {
    const { id } = req.params
    const body = req.body
    const result = await this.useCase.execute(id, body)
    return resp.json(result)
  }
}
