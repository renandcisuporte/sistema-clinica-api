import { Clinic as ClinicPrisma } from '@prisma/client'

export type ClinicInput = Omit<
  ClinicPrisma,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
export type ClinicUpdate = Omit<
  ClinicPrisma,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
>

export type ClinicOutput = Omit<ClinicPrisma, 'deletedAt'>
