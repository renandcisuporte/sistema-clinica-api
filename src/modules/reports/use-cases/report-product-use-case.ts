import { ProductsRepository } from '@/modules/products/prisma/repositories/product-repository'
import { PdfGenerator } from '@/shared/providers/pdf-generator'
import fs from 'fs/promises'

export class ReportProductUseCase implements ReportProductUseCaseInterface {
  constructor(
    protected readonly repository: ProductsRepository,
    protected readonly pdfGenerator: PdfGenerator
  ) {}

  async execute(input: Input): Promise<Output> {
    try {
      const { clinicId, ...rest } = input

      const limit = await this.repository.count({ clinicId })
      const products = await this.repository.all({ limit, clinicId, ...rest })

      const pdfBuffer = await this.pdfGenerator.generate(products)
      await fs.writeFile(rest.namePath, pdfBuffer)
    } catch (error) {
      console.log('Error generating PDF:', error)
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
  nameDesc?: string
  nameAsc?: string
}

type Output = void
