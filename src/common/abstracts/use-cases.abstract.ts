export abstract class UseCaseCreateAbstract<
  Repo = any,
  Resp = any,
  Input = any
> {
  constructor(protected readonly repository: Repo) {}

  abstract execute(args: Input): Promise<Resp>
}

export abstract class UseCaseUpdateAbstract<
  Repo = any,
  Resp = any,
  Id = string,
  Input = any
> {
  constructor(protected readonly repository: Repo) {}

  abstract execute(id: Id, args: Input): Promise<Resp>
}

export abstract class UseCaseFirstAbstract<
  Repo = any,
  Resp = any,
  Id = string
> {
  constructor(protected readonly repository: Repo) {}

  abstract execute(id: Id): Promise<Resp>
}

export abstract class UseCaseAllAbstract<Repo = any, Resp = any, Params = {}> {
  constructor(protected readonly repository: Repo) {}

  abstract execute(params?: Params): Promise<Resp>
}
