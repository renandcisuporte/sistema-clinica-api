import { ControllerInterface } from '@/common/interfaces/controller.interface'
import { UseCaseInterface } from '@/common/interfaces/use-case.interface'
import { Clinic } from '@prisma/client'
import { Request, Response } from 'express'

interface Controller {
  data: Clinic | null
}

export class FindFirstClinicsController
  implements ControllerInterface<Request, Response>
{
  constructor(private readonly usecase: UseCaseInterface) {}

  async handle(request: Request, response: Response) {
    const { code } = request.params
    const resp = await this.usecase.execute({ code })
    return response.json(resp)
  }
}
