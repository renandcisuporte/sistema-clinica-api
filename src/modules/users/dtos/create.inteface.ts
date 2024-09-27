import { User } from './user.interface'

export interface CreateUser
  extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  password: string
}
