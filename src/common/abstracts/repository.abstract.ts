export abstract class RepositoryAbstract<Repo extends any> {
  constructor(protected readonly repository: Repo) {}
}
