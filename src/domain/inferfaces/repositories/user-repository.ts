import { UserInput, UserOutput } from '@/domain/entities/user'

export interface UserRepository {
  findByEmail(email: string): Promise<UserOutput | null>
  findById(id: string): Promise<UserOutput | null>
  resetPassword(email: string, password?: string): Promise<void>
  create(user: UserInput): Promise<UserOutput>
  update(id: string, user: UserInput): Promise<UserOutput>
  delete(id: string): Promise<void>
}
