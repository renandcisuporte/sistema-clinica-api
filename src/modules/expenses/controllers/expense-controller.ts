import { ActiveInativeExpenseUseCaseInterface } from '@/modules/expenses/use-cases/active-inative-expense-use-case'
import { CreateExpenseUseCaseInterface } from '@/modules/expenses/use-cases/create-expense-use-case'
import { DeleteExpenseUseCaseInterface } from '@/modules/expenses/use-cases/delete-expense-use-case'
import { FindAllExpenseUseCaseInterface } from '@/modules/expenses/use-cases/find-all-expense-use-case'
import { FindFirstExpenseUseCaseInterface } from '@/modules/expenses/use-cases/find-first-expense-use-case'
import { UpdateExpenseUseCaseInterface } from '@/modules/expenses/use-cases/update-expense-use-case'
import { Request, Response } from 'express'
import { TypeExpenseUseCaseInterface } from '../use-cases/type-expense-use-case'

export class ExpenseController {
  constructor(
    private readonly findAllUseCase: FindAllExpenseUseCaseInterface,
    private readonly findFirstUseCase: FindFirstExpenseUseCaseInterface,
    private readonly createUseCase: CreateExpenseUseCaseInterface,
    private readonly updateUseCase: UpdateExpenseUseCaseInterface,
    private readonly deleteUseCase: DeleteExpenseUseCaseInterface,
    private readonly activeInativeUseCase: ActiveInativeExpenseUseCaseInterface,
    private readonly typeUseCase: TypeExpenseUseCaseInterface
  ) {}

  async activeInativeType(req: Request, res: Response) {
    const { id } = req.params
    const result = await this.typeUseCase.execute(id)
    return res.status(200).json(result)
  }

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
