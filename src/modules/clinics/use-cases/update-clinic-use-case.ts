import {
  ClinicInput,
  ClinicOutput
} from '@/modules/clinics/prisma/entities/clinic'
import { ClinicRepository } from '@/modules/clinics/prisma/repositories/clinic-repository'

type Input = { id: string; input: ClinicInput }
type Output = { data: ClinicOutput }

export class UpdateClinicUseCase implements UpdateClinicUseCaseInterface {
  constructor(protected readonly repository: ClinicRepository) {}

  async execute(data: Input) {
    const { id, input } = data
    const result = await this.repository.update(id, input)

    // const { fantasy, clinicId } = result
    // queue.mail.push({
    //   from: `"${fantasy}" <contato@dclinicas.com.br>`,
    //   to: 'contato@dclinicas.com.br',
    //   subject: `Cadastro de ${fantasy}`,
    //   text: `Olá, ${fantasy} foi cadastrado com sucesso!`,
    //   html: `
    //     <h1>Cadastro de ${fantasy}</h1>
    //     <p>Olá, ${fantasy} foi cadastrado com sucesso!</p>
    //     <p>clique no link abaixo para acessar o sistema</p>
    //     <a href="http://localhost:3000/login">Acessar sistema</a>
    //     <p>Code: ${clinicId}</p>
    //     <p>Se você não solicitou este cadastro, entre em contato com o suporte</p>
    //   `
    // })

    return { data: { ...result } }
  }
}

export interface UpdateClinicUseCaseInterface {
  execute(data: Input): Promise<Output>
}
