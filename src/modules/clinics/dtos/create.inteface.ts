import { Clinic } from '@prisma/client'

export interface CreateClinic
  extends Omit<Clinic, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}
