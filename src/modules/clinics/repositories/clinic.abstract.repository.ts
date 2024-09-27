import { RepositoryAbstract } from '@/common/abstracts/repository.abstract'
import { Clinic } from '@prisma/client'

export abstract class ClinicAbstractRepository<
  Repo = any,
  Resp = any,
  Input = any,
  Id = any
> extends RepositoryAbstract<Repo> {
  abstract create(input: Input): Promise<Resp | null>
  abstract update(id: Id, input: Input): Promise<Resp | null>
  abstract findFirst(id: string): Promise<Clinic | null>
  abstract findAll(): Promise<Clinic[]>
}
