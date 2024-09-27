import { ControllerAbstract } from '@/common/abstracts/controller.abstract'
import { UpdateClinicUseCase } from '@/modules/clinics/use-cases/update-clinic.use-case'
import { Request, Response } from 'express'

export class UpdateClinicController extends ControllerAbstract<UpdateClinicUseCase> {
  async handle(req: Request, resp: Response) {
    const { id } = req.params
    const body = req.body
    const result = await this.useCase.execute(id, body)
    return resp.json(result)
  }
}
