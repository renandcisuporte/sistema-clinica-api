import { Request, Response } from 'express'

export interface ControllerInterface<Req = Request, Res = Response> {
  handle(request: Req, response: Res): Promise<Res>
}
