import { Response } from 'express'

export interface ControllerInterface<Res = Response> {
  handle(...args: any): Promise<Res>
}
