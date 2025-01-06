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
    const { nameDesc, nameAsc } = req.body

    const name = ['product-pdf', '.pdf'].join('')
    const namePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      name
    )

    await this.useCaseProduct.execute({ clinicId, namePath, nameDesc, nameAsc })

    const data = `${req.protocol}://${req.get('host')}/${name}`
    res.status(201).send({ data })
  }

  async pdfProcediment(req: Request, res: Response): Promise<void> {
    const { clinicId } = req
    const { nameDesc, nameAsc } = req.body

    const name = 'procediment-pdf.pdf'
    const namePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      name
    )

    await this.useCaseProcediment.execute({
      clinicId,
      namePath,
      nameDesc,
      nameAsc
    })

    const data = `${req.protocol}://${req.get('host')}/${name}`
    res.status(201).send({ data })

    // const buffer = fs.readFileSync(namePath)
    // res.setHeader('Content-Length', buffer.length)
    // res.setHeader('Content-Type', 'application/pdf')
    // res.send(buffer)
  }
}
