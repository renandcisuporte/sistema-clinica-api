import { AuthOutput, AuthUser } from '@/modules/auth/prisma/entities/auth'

export interface AuthRepository {
  findById(id: string): Promise<AuthUser | null>
  findByEmail(email: string): Promise<AuthOutput | null>
}
