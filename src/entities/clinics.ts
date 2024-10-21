import { Clinic as ClinicPrisma, Prisma } from '@prisma/client'

export type ClinicInput = Omit<
  Prisma.ClinicCreateInput,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
export type ClinicUpdate = Omit<
  Prisma.ClinicUpdateInput,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
>
export type ClinicOutput = Omit<ClinicPrisma, 'deletedAt'>
