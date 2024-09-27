import { RepositoryAbstract } from '@/common/abstracts/repository.abstract'

export class FindAllUserUseCase extends RepositoryAbstract {
  async execute(params: undefined) {
    const result = await this.repository.findAll(params)
    return { data: result }
  }
}
