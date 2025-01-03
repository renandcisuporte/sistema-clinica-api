import { Request, Response } from 'express'
import { ReportProductUseCaseInterface } from '../use-cases/report-product-use-case'
export class ReportProductController {
  constructor(private readonly useCase: ReportProductUseCaseInterface) {}

  async show(req: Request, res: Response): Promise<void> {
    const pdfBuffer = await this.useCase.execute()

    res.setHeader('Content-Length', pdfBuffer.length)
    res.setHeader('Content-Type', 'application/pdf')
    res.status(200).send(pdfBuffer)
  }
}
