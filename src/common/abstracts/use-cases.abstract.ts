import {
  AllRepositoryInterface,
  CreateRepositoryInterface,
  DeleteRepositoryInterface,
  FirstRepositoryInterface,
  UpdateRepositoryInterface
} from '@/common/interfaces/repository.interface'

export abstract class CreateUseCaseAbstract<Resp = any, Input = any> {
  constructor(protected readonly repository: CreateRepositoryInterface) {}

  abstract execute(args: Input): Promise<Resp>
}

export abstract class UpdateUseCaseAbstract<Resp = any, Id = any, Input = any> {
  constructor(protected readonly repository: UpdateRepositoryInterface) {}

  abstract execute(id: Id, args: Input): Promise<Resp>
}

export abstract class DeleteUseCaseAbstract<Resp = any, Id = any> {
  constructor(protected readonly repository: DeleteRepositoryInterface) {}

  abstract execute(id: Id): Promise<Resp>
}

export abstract class FirstUseCaseAbstract<Resp = any, Id = any> {
  constructor(protected readonly repository: FirstRepositoryInterface) {}

  abstract execute(id: Id): Promise<Resp>
}

export abstract class AllUseCaseAbstract<Resp = any, Params = any> {
  constructor(protected readonly repository: AllRepositoryInterface) {}

  abstract execute(params?: Params): Promise<Resp>
}
