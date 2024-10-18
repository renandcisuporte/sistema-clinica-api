import { AuthenticationInterface } from '@/entities/authentication'

export interface AuthenticationRepositoryInterface {
  find(
    userId: string
  ): Promise<Omit<AuthenticationInterface, 'password'> | null>
  first(email: string): Promise<AuthenticationInterface | null>
}
