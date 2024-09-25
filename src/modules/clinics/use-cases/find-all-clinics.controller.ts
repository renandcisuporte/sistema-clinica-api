import { ControllerInterface } from '@/common/interfaces/controller.interface'
import { UseCaseInterface } from '@/common/interfaces/use-case.interface'
import { Response } from 'express'

export class FindAllClinicsController implements ControllerInterface {
  constructor(private readonly usecase: UseCaseInterface) {}

  async handle(_: any, resp: Response): Promise<Response> {
    const result = await this.usecase.execute()
    return resp.status(200).json(result)
  }
}
