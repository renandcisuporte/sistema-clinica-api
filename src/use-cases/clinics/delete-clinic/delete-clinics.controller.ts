import { ControllerInterface } from '@/common/controller.interface'
import { DeleteUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class DeleteClinicsController implements ControllerInterface {
  constructor(protected readonly useCase: DeleteUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const { id } = req.params
    await this.useCase.execute({ id, userId })
    return res.status(204).json()
  }
}
