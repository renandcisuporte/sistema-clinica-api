export abstract class RepositoryAbstract<Repo = any> {
  constructor(protected readonly repository: Repo) {}
}
