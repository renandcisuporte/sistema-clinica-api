export interface ControllerInterface<Req = any, Resp = any> {
  handle(req: Req, res: Resp): Promise<Resp>
}
