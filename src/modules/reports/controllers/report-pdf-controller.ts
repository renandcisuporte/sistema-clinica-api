import { Request, Response } from 'express'
import fs from 'fs'
import { join } from 'path'
import { ReportProcedimentProductUseCaseInterface } from '../use-cases/report-precediment-product-use-case'
import { ReportProductUseCaseInterface } from '../use-cases/report-product-use-case'

export class ReportPdfController {
  constructor(
    private readonly useCaseProduct: ReportProductUseCaseInterface,
    private readonly useCaseProcediment: ReportProcedimentProductUseCaseInterface
  ) {}

  async pdfProduct(req: Request, res: Response): Promise<void> {
    const { clinicId } = req
    const namePath = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'product-pdf.pdf'
    )

    fs.unlinkSync(namePath)

    const pdfBuffer = await this.useCaseProduct.execute({
      clinicId
    })
    fs.writeFileSync(namePath, pdfBuffer)

    res
      .status(201)
      .send({ data: `${req.protocol}://${req.get('host')}/product-pdf.pdf` })

    // res.setHeader('Content-Length', pdfBuffer.length)
    // res.setHeader('Content-Type', 'application/pdf')
    // res.status(200).send(pdfBuffer)
  }

  async pdfProcediment(req: Request, res: Response): Promise<void> {
    const { clinicId } = req
    const namePath = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'procediment-pdf.pdf'
    )

    fs.unlinkSync(namePath)

    const pdfBuffer = await this.useCaseProcediment.execute({
      clinicId
    })
    fs.writeFileSync(namePath, pdfBuffer)

    res.status(201).send({
      data: `${req.protocol}://${req.get('host')}/procediment-pdf.pdf`
    })

    // res.setHeader('Content-Length', pdfBuffer.length)
    // res.setHeader('Content-Type', 'application/pdf')
    // res.status(200).send(pdfBuffer)
  }
}
