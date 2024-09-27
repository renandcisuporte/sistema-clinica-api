export interface UseCaseResponseInterface<T = any> {
  data: T
}

export interface UseCaseInterface {
  execute(...args: any | any[]): Promise<UseCaseResponseInterface>
}
