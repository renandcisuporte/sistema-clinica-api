import { ServiceOutput } from '@/modules/services/prisma/entities/service'
import { ServicesRepository } from '@/modules/services/prisma/repositories/service-repository'

export interface FindAllServiceUseCaseInterface {
  execute(args: any): Promise<Output>
}

export class FindAllServiceUseCase implements FindAllServiceUseCaseInterface {
  constructor(protected readonly repository: ServicesRepository) {}

  async execute(args: any): Promise<Output> {
    const { clinicId, name = '', limit, page } = args

    const common = {
      clinicId,
      name,
      limit,
      page
    }

    const [total, data] = await Promise.all([
      this.repository.count({ clinicId, name }),
      this.repository.all(common)
    ])

    return {
      total,
      data
    }
  }
}

type Output = {
  total: number
  data: ServiceOutput[]
}
