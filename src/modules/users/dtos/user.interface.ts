import { User as UserPrisma } from '@prisma/client'

export interface User
  extends Omit<
    UserPrisma,
    'id' | 'code' | 'password' | 'passwordVerify' | 'token' | 'refreshToken'
  > {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  fullName: string
  email: string
}
