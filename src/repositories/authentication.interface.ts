import { AuthenticationInterface } from '@/entities/authentication'

export interface AuthenticationRepositoryInterface {
  first(email: string): Promise<AuthenticationInterface | null>
}
