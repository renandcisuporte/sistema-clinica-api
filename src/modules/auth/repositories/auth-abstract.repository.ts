export interface AuthRepositoryInterface<T = any> {
  auth(email: string): Promise<T | null>
}
