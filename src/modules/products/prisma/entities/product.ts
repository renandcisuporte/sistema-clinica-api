import { Product as ProductPrisma } from '@prisma/client'

export type ProductInput = Pick<
  ProductPrisma,
  'clinicId' | 'name' | 'quantity' | 'price'
>

export type ProductOutput = Omit<ProductPrisma, 'deletedAt'>
