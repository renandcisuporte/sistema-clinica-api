import { ActiveInativePeopleUseCaseInterface } from '@/modules/peoples/use-cases/active-inative-people-use-case'
import { CreatePeopleUseCaseInterface } from '@/modules/peoples/use-cases/create-people-use-case'
import { DeletePeopleUseCaseInterface } from '@/modules/peoples/use-cases/delete-people-use-case'
import { FindAllPeopleUseCaseInterface } from '@/modules/peoples/use-cases/find-all-people-use-case'
import { FindFirstPeopleUseCaseInterface } from '@/modules/peoples/use-cases/find-first-people-use-case'
import { ShowActiveInativePeopleUseCaseInterface } from '@/modules/peoples/use-cases/show-active-inative-people-use-case'
import { UpdatePeopleUseCaseInterface } from '@/modules/peoples/use-cases/update-people-use-case'
import { Request, Response } from 'express'

export class PeopleController {
  constructor(
    private readonly allUseCase: FindAllPeopleUseCaseInterface,
    private readonly findFirstUseCase: FindFirstPeopleUseCaseInterface,
    private readonly createUseCase: CreatePeopleUseCaseInterface,
    private readonly updateUseCase: UpdatePeopleUseCaseInterface,
    private readonly deleteUseCase: DeletePeopleUseCaseInterface,
    private readonly activeInativeUseCase: ActiveInativePeopleUseCaseInterface,
    private readonly showActiveInativeUseCase: ShowActiveInativePeopleUseCaseInterface
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
