import { RepositoryAbstract } from '@/common/abstracts/repository.abstract'

export abstract class ClinicAbstractRepository<
  Repo = any,
  Resp = any,
  Input = any,
  Id = any
> extends RepositoryAbstract<Repo> {
  abstract create(input: Input): Promise<Resp | null>
  abstract update(id: Id, input: Input): Promise<Resp | null>
  abstract findFirst(id: string): Promise<Resp | null>
  abstract findAll(): Promise<Resp[]>
}
