import { ActiveInativeRoomUseCaseInterface } from '@/modules/rooms/use-cases/active-inative-room-use-case'
import { CreateRoomUseCaseInterface } from '@/modules/rooms/use-cases/create-room-use-case'
import { DeleteRoomUseCaseInterface } from '@/modules/rooms/use-cases/delete-room-use-case'
import { FindAllRoomUseCaseInterface } from '@/modules/rooms/use-cases/find-all-room-use-case'
import { FindFirstRoomUseCaseInterface } from '@/modules/rooms/use-cases/find-first-room-use-case'
import { UpdateRoomUseCaseInterface } from '@/modules/rooms/use-cases/update-room-use-case'
import { Request, Response } from 'express'

export class RoomController {
  constructor(
    private readonly findAllUseCase: FindAllRoomUseCaseInterface,
    private readonly findFirstUseCase: FindFirstRoomUseCaseInterface,
    private readonly createUseCase: CreateRoomUseCaseInterface,
    private readonly updateUseCase: UpdateRoomUseCaseInterface,
    private readonly deleteUseCase: DeleteRoomUseCaseInterface,
    private readonly activeInativeUseCase: ActiveInativeRoomUseCaseInterface
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
