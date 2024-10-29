import { ActiveInativePeopleUseCase } from '@/use-cases/active-inative-people-use-case'
import { CreatePeopleUseCase } from '@/use-cases/create-people-use-case'
import { DeletePeopleUseCase } from '@/use-cases/delete-people-use-case'
import { FindAllPeopleUseCase } from '@/use-cases/find-all-people-use-case'
import { FindFirstPeopleUseCase } from '@/use-cases/find-first-people-use-case'
import { ShowActiveInativePeopleUseCase } from '@/use-cases/show-active-inative-people-use-case'
import { UpdatePeopleUseCase } from '@/use-cases/update-people-use-case'
import { Request, Response } from 'express'

export class PeopleController {
  constructor(
    private readonly allUseCase: FindAllPeopleUseCase,
    private readonly findFirstUseCase: FindFirstPeopleUseCase,
    private readonly createUseCase: CreatePeopleUseCase,
    private readonly updateUseCase: UpdatePeopleUseCase,
    private readonly deleteUseCase: DeletePeopleUseCase,
    private readonly activeInativeUseCase: ActiveInativePeopleUseCase,
    private readonly showActiveInativeUseCase: ShowActiveInativePeopleUseCase
  ) {}

  async all(req: Request, res: Response) {
    const { query, clinicId } = req
    const resutl = await this.allUseCase.execute({ clinicId, ...query })
    return res.status(200).json(resutl)
  }

  async findFirst(req: Request, res: Response) {
    const { id } = req.params
    const resutl = await this.findFirstUseCase.execute(id)
    return res.status(200).json(resutl)
  }

  async showActiveInative(req: Request, res: Response) {
    const { clinicId } = req
    const resutl = await this.showActiveInativeUseCase.execute(clinicId)
    return res.status(200).json(resutl)
  }

  async activeInative(req: Request, res: Response) {
    const { id } = req.params
    await this.activeInativeUseCase.execute(id)
    return res.status(200).json({ message: 'Atualizado com sucesso!' })
  }

  async create(req: Request, res: Response) {
    const { body, clinicId } = req
    const resutl = await this.createUseCase.execute({ ...body, clinicId })
    return res.status(201).json(resutl)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { body } = req

    const resutl = await this.updateUseCase.execute({ id, input: body })
    return res.status(200).json(resutl)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const resutl = await this.deleteUseCase.execute(id)
    return res.status(204).json(resutl)
  }
}
