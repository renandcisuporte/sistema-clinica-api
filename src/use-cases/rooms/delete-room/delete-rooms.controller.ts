import { ControllerInterface } from '@/common/controller.interface'
import { DeleteUseCaseInterface } from '@/common/use-case.interface'
import { Request, Response } from 'express'

export class DeleteRoomsController implements ControllerInterface {
  constructor(protected readonly useCase: DeleteUseCaseInterface) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    await this.useCase.execute({ id })
    return res.status(204).json()
  }
}
