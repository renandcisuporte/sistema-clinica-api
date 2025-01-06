import { ServiceInProductsRepository } from '@/modules/services-in-products/prisma/repositories/service-in-product-repository'
import { PdfGenerator } from '@/shared/providers/pdf-generator'
import fs from 'fs/promises'

export class ReportProcedimentProductUseCase
  implements ReportProcedimentProductUseCaseInterface
{
  constructor(
    protected readonly repository: ServiceInProductsRepository,
    protected readonly pdfGenerator: PdfGenerator
  ) {}

  async execute(input: Input): Promise<Output> {
    try {
      const { clinicId, ...rest } = input

      const limit = await this.repository.count({ clinicId })
      const products = await this.repository.all({ limit, clinicId, ...rest })

      const direction = rest.nameAsc ? 1 : rest.nameDesc ? -1 : 0

      products.sort((a, b) => {
        const groupComparison =
          a.serviceName.localeCompare(b.serviceName) * direction
        if (groupComparison !== 0) {
          return groupComparison
        }
        return a.productName.localeCompare(b.productName) * direction
      })

      const pdfBuffer = await this.pdfGenerator.generate(products)
      await fs.writeFile(rest.namePath, pdfBuffer)
    } catch (error) {
      console.log('Error generating PDF:', error)
      throw new Error('Error generating PDF')
    }
  }
}

export interface ReportProcedimentProductUseCaseInterface {
  execute(input: Input): Promise<Output>
}

type Input = {
  namePath: string
  clinicId: string
  nameDesc?: string
  nameAsc?: string
}

type Output = void
