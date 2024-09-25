import { ControllerInterface } from '@/common/interfaces/controller.interface'
import { UseCaseInterface } from '@/common/interfaces/use-case.interface'
import { Request as EXReq, Response as EXResp } from 'express'
import { Get, Route } from 'tsoa'

@Route('/clinics')
export class FindAllClinicsController implements ControllerInterface {
  constructor(private readonly usecase: UseCaseInterface) {}

  @Get()
  async handle(_req: EXReq, resp: EXResp): Promise<EXResp> {
    const result = await this.usecase.execute()
    return resp.status(200).json(result)
  }
}
