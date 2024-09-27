import { Request, Response } from 'express'

export abstract class ControllerAbstract<Case = any, Resp = Response> {
  constructor(protected readonly useCase: Case) {}

  abstract handle(req: Request, res: Response): Promise<Resp>
}
