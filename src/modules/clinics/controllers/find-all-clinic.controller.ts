import { AllControllerAbstract } from '@/common/abstracts/controller.abstract'
import { Request, Response } from 'express'

export class FindAllClinicController extends AllControllerAbstract {
  async handle(_req: Request, resp: Response): Promise<Response> {
    const result = await this.useCase.execute()
    return resp.status(200).json(result)
  }
}
