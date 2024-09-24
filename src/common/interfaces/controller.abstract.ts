import { Request, Response } from 'express'

export abstract class ControllerAbstract {
  abstract handle(request: Request, response: Response): Promise<void>
}
