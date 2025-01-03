import { PdfGenerator } from '@/shared/providers/pdf-generator'
import { ProductsRepository } from '../prisma/repositories/product-repository'

export class ReportProductUseCase implements ReportProductUseCaseInterface {
  constructor(
    protected readonly repository: ProductsRepository,
    protected readonly pdfGenerator: PdfGenerator
  ) {}

  async execute() {
    try {
      const products = await this.repository.all({ limit: 10000 })
      const pdfBuffer = await this.pdfGenerator.generate(products)
      return pdfBuffer
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw new Error('Error generating PDF')
    }
  }
}

export interface ReportProductUseCaseInterface {
  execute(): Promise<Buffer>
}
