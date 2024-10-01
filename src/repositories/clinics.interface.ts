export interface ClinicsRepositoryInterface {
  all(...args: any): Promise<any[]>
  first(id: string): Promise<any | null>
  create(input: any): Promise<any>
  update(id: string, input: any): Promise<any>
  delete(id: string): Promise<void>
}
