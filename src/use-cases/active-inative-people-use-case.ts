import { PeopleRepository } from '@/domain/inferfaces/repositories/people-repository'

export class ActiveInativePeopleUseCase {
  constructor(private readonly repository: PeopleRepository) {}

  async execute(id: string): Promise<unknown> {
    await this.repository.activeInative(id)
    return { data: { message: 'Atualizado com sucesso!' } }
  }
}
