import { Request, Response } from 'express'

export interface ControllerInterface {
  handle(req: Request, res: Response): Promise<Response>
}
