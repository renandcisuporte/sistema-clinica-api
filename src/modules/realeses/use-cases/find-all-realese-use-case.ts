import { RealeseOutput } from '@/modules/realeses/prisma/entities/realese'
import { RealeseRepository } from '../prisma/repositories/realese-repository'

type Output = {
  total: number
  data: RealeseOutput[]
}

export class FindAllRealeseUseCase implements FindAllRealeseUseCaseInterface {
  constructor(protected readonly repository: RealeseRepository) {}

  async execute(args: any): Promise<Output> {
    const { clinicId, limit, page } = args

    const common = {
      clinicId,
      limit,
      page
    }

    const [total, data] = await Promise.all([
      this.repository.count({ clinicId }),
      this.repository.all(common)
    ])

    return {
      total,
      data
    }
  }
}

export interface FindAllRealeseUseCaseInterface {
  execute(args: any): Promise<Output>
}
