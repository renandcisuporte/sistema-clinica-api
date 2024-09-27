import { UseCaseAbstract } from '@/common/abstracts/use-cases.abstract'

export class FindFirstUserUseCase extends UseCaseAbstract {
  async execute(args: any) {
    const result = await this.repository.findFirst(args.code)
    return { data: result }
  }
}
