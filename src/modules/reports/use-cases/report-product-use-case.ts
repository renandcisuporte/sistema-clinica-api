import { ProductsRepository } from '@/modules/products/prisma/repositories/product-repository'
import { PdfGenerator } from '@/shared/providers/pdf-generator'
import fs from 'fs'

export class ReportProductUseCase implements ReportProductUseCaseInterface {
  constructor(
    protected readonly repository: ProductsRepository,
    protected readonly pdfGenerator: PdfGenerator
  ) {}

  async execute(input: Input): Promise<Output> {
    try {
      const { clinicId, namePath } = input
      fs.readFile(namePath, (err) => {
        if (err) return
        fs.unlink(namePath, (err) => console.log('Error deleting file:', err))
      })

      const products = await this.repository.all({
        limit: 10000,
        clinicId: clinicId
      })
      const pdfBuffer = await this.pdfGenerator.generate(products)
      fs.writeFileSync(namePath, pdfBuffer)
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw new Error('Error generating PDF')
    }
  }
}

export interface ReportProductUseCaseInterface {
  execute(input: Input): Promise<Output>
}

type Input = {
  namePath: string
  clinicId: string
}

type Output = void
