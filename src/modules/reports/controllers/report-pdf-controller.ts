import { Request, Response } from 'express'
import path from 'path'
import { ReportProcedimentProductUseCaseInterface } from '../use-cases/report-precediment-product-use-case'
import { ReportProductUseCaseInterface } from '../use-cases/report-product-use-case'

export class ReportPdfController {
  constructor(
    private readonly useCaseProduct: ReportProductUseCaseInterface,
    private readonly useCaseProcediment: ReportProcedimentProductUseCaseInterface
  ) {}

  async pdfProduct(req: Request, res: Response): Promise<void> {
    const { clinicId } = req
    const namePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'product-pdf.pdf'
    )

    await this.useCaseProduct.execute({ clinicId, namePath })

    const data = `${req.protocol}://${req.get('host')}/product-pdf.pdf`
    res.status(201).send({ data })
  }

  async pdfProcediment(req: Request, res: Response): Promise<void> {
    const { clinicId } = req
    const namePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'procediment-pdf.pdf'
    )

    const pdfBuffer = await this.useCaseProcediment.execute({
      clinicId,
      namePath
    })

    const data = `${req.protocol}://${req.get('host')}/procediment-pdf.pdf`
    res.status(201).send({ data })
  }
}
