export interface UseCaseInterface {
  execute(...args: any[]): Promise<any>
}
