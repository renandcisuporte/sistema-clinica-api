import {
  AllUseCaseInterface,
  CreateUseCaseInterface,
  DeleteUseCaseInterface,
  FirstUseCaseInterface,
  UpdateUseCaseInterface
} from '@/common/interfaces/use-case.interface'
import { Controller as TSOAController } from 'tsoa'

export abstract class Controller<Req = any, Resp = any> extends TSOAController {
  constructor() {
    super()
  }

  abstract handle(req: Req, res: Resp): Promise<Resp>
}

export abstract class CreateControllerAbstract extends Controller {
  constructor(protected readonly useCase: CreateUseCaseInterface) {
    super()
  }
}

export abstract class UpdateControllerAbstract extends Controller {
  constructor(protected readonly useCase: UpdateUseCaseInterface) {
    super()
  }
}

export abstract class DeleteControllerAbstract extends Controller {
  constructor(protected readonly useCase: DeleteUseCaseInterface) {
    super()
  }
}

export abstract class FirstControllerAbstract extends Controller {
  constructor(protected readonly useCase: FirstUseCaseInterface) {
    super()
  }
}

export abstract class AllControllerAbstract extends Controller {
  constructor(protected readonly useCase: AllUseCaseInterface) {
    super()
  }
}
