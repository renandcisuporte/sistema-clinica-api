import { ActiveInativeRoomUseCase } from '@/use-cases/active-inative-room-use-case'
import { CreateRoomUseCase } from '@/use-cases/create-room-use-case'
import { DeleteRoomUseCase } from '@/use-cases/delete-room-use-case'
import { FindAllRoomUseCase } from '@/use-cases/find-all-room-use-case'
import { FindFirstRoomUseCase } from '@/use-cases/find-first-room-use-case'
import { UpdateRoomUseCase } from '@/use-cases/update-room-use-case'
import { Request, Response } from 'express'

export class RoomController {
  constructor(
    private readonly findAllUseCase: FindAllRoomUseCase,
    private readonly findFirstUseCase: FindFirstRoomUseCase,
    private readonly createUseCase: CreateRoomUseCase,
    private readonly updateUseCase: UpdateRoomUseCase,
    private readonly deleteUseCase: DeleteRoomUseCase,
    private readonly activeInativeUseCase: ActiveInativeRoomUseCase
  ) {}

  async activeInative(req: Request, res: Response) {
    const { id } = req.params
    const result = await this.activeInativeUseCase.execute(id)
    return res.status(200).json(result)
  }

  async showActiveInative(req: Request, res: Response) {
    const { id } = req.params
    await this.activeInativeUseCase.execute(id)
    return res.status(200).json({ message: 'Atualizado com sucesso!' })
  }

  async findAll(req: Request, res: Response) {
    const { query, clinicId } = req

    const result = await this.findAllUseCase.execute({ clinicId, ...query })
    return res.status(200).json(result)
  }

  async findFirst(req: Request, res: Response) {
    const { id } = req.params
    const result = await this.findFirstUseCase.execute(id)
    return res.status(200).json(result)
  }

  async create(req: Request, res: Response) {
    const { body } = req
    const { clinicId } = req
    const result = await this.createUseCase.execute({ clinicId, ...body })
    return res.status(201).json(result)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { body } = req
    const result = await this.updateUseCase.execute(id, body)
    return res.status(200).json(result)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const result = await this.deleteUseCase.execute(id)
    return res.status(204).json(result)
  }
}
