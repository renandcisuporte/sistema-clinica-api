import { ProductsRepository } from '@/modules/products/prisma/repositories/product-repository'
import { PdfGenerator } from '@/shared/providers/pdf-generator'

export class ReportProductUseCase implements ReportProductUseCaseInterface {
  constructor(
    protected readonly repository: ProductsRepository,
    protected readonly pdfGenerator: PdfGenerator
  ) {}

  async execute(args: { clinicId: string }) {
    try {
      const products = await this.repository.all({
        limit: 10000,
        clinicId: args.clinicId
      })
      const pdfBuffer = await this.pdfGenerator.generate(products)
      return pdfBuffer
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw new Error('Error generating PDF')
    }
  }
}

export interface ReportProductUseCaseInterface {
  execute(args: { clinicId: string }): Promise<Buffer>
}
