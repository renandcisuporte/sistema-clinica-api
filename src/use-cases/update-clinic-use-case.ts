import { ClinicInput, ClinicOutput } from '@/domain/entities/clinic'
import { ClinicRepository } from '@/domain/inferfaces/repositories/clinic-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'
import { queue } from '@/shared/providers/queue'

type Input = { id: string; input: ClinicInput }
type Output = { data: ClinicOutput }

export class UpdateClinicUseCase implements UseCase<Input, Output> {
  constructor(protected readonly repository: ClinicRepository) {}

  async execute(data: Input) {
    const { id, input } = data
    const result = await this.repository.update(id, input)

    const { fantasy, clinicId } = result

    queue.mail.push({
      from: `"${fantasy}" <contato@dclinicas.com.br>`,
      to: 'contato@dclinicas.com.br',
      subject: `Cadastro de ${fantasy}`,
      text: `Olá, ${fantasy} foi cadastrado com sucesso!`,
      html: `
        <h1>Cadastro de ${fantasy}</h1>
        <p>Olá, ${fantasy} foi cadastrado com sucesso!</p>
        <p>clique no link abaixo para acessar o sistema</p>
        <a href="http://localhost:3000/login">Acessar sistema</a>
        <p>Code: ${clinicId}</p>
        <p>Se você não solicitou este cadastro, entre em contato com o suporte</p>
      `
    })

    return { data: { ...result } }
  }
}
