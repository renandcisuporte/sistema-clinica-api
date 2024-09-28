import { FirstUseCaseAbstract } from '@/common/abstracts/use-cases.abstract'

export class FindFirstUserUseCase extends FirstUseCaseAbstract {
  async execute(args: any) {
    const result = await this.repository.first(args.code)
    return { data: result }
  }
}
