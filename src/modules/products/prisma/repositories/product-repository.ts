import {
  ProductInput,
  ProductOutput
} from '@/modules/products/prisma/entities/product'

export interface ProductsRepository {
  count(...args: any): Promise<number>
  all(...args: any): Promise<ProductOutput[]>
  first(id: string): Promise<ProductOutput | null>
  create(input: ProductInput): Promise<ProductOutput>
  update(id: string, input: ProductInput): Promise<ProductOutput>
  delete(id: string): Promise<void>
}
