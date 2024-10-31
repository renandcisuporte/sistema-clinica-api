import { FindFirstClinicWorkTimeUseCaseInterface } from '@/modules/clinics/use-cases/find-first-clinic-work-use-case'
import { UpdateWorkTimeRecommendedUseCaseIterface } from '@/modules/work-times/use-cases/update-work-time-recommended-use-case'
import { UpdateWorkTimeServiceUseCaseInterface } from '@/modules/work-times/use-cases/update-work-time-service-use-case'
import { UpdateWorkTimeUseCaseInterface } from '@/modules/work-times/use-cases/update-work-time-use-case'
import { Request, Response } from 'express'

export class WorkTimeController {
  constructor(
    private readonly findFirstClinicWorkTimeUseCase: FindFirstClinicWorkTimeUseCaseInterface,
    private readonly updateWorkTimeUseCase: UpdateWorkTimeUseCaseInterface,
    private readonly updateWorkTimeRecommendedUseCase: UpdateWorkTimeRecommendedUseCaseIterface,
    private readonly updateWorkTimeServiceUseCase: UpdateWorkTimeServiceUseCaseInterface
  ) {}

  async workTime(req: Request, res: Response) {
    const { id } = req.params
    const result = await this.findFirstClinicWorkTimeUseCase.execute(id)
    return res.status(200).json(result)
  }

  async updateWorkTime(req: Request, res: Response) {
    const { id } = req.params
    const { body } = req
    const result = await this.updateWorkTimeUseCase.execute({
      clinicId: id,
      input: body
    })
    return res.status(200).json(result)
  }

  async updateWorkTimeRecommended(req: Request, res: Response) {
    const { id } = req.params
    const { body } = req
    const result = await this.updateWorkTimeRecommendedUseCase.execute({
      clinicId: id,
      input: body
    })
    return res.status(200).json(result)
  }

  async updateWorkTimeService(req: Request, res: Response) {
    const { id } = req.params
    const { body } = req
    const result = await this.updateWorkTimeServiceUseCase.execute({
      clinicId: id,
      input: body
    })
    return res.status(200).json(result)
  }
}
