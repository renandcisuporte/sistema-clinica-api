import { User } from '../dtos/user.interface'

export interface UserRepositoryInterface {
  delete(id: string): Promise<void>
  update(id: string, ...args: any[]): Promise<User | null>
  create(...args: any[]): Promise<User>
  findAll(...args: any[]): Promise<User[]>
  findFirst(...args: any[]): Promise<User | null>
}
