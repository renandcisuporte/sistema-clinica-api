import { ControllerAbstract } from '@/common/abstracts/controller.abstract'
import { Response } from 'express'

export class FindAllClinicController extends ControllerAbstract {
  async handle(_: any, resp: Response): Promise<Response> {
    const result = await this.useCase.execute()
    return resp.status(200).json(result)
  }
}
