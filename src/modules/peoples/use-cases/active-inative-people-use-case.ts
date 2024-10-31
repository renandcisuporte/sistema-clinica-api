import { PeopleRepository } from '@/modules/peoples/prisma/repositories/people-repository'

type Output = { data: { message: string } }

export class ActiveInativePeopleUseCase
  implements ActiveInativePeopleUseCaseInterface
{
  constructor(private readonly repository: PeopleRepository) {}

  async execute(id: string): Promise<Output> {
    await this.repository.activeInative(id)
    return { data: { message: 'Atualizado com sucesso!' } }
  }
}

export interface ActiveInativePeopleUseCaseInterface {
  execute(id: string): Promise<Output>
}
