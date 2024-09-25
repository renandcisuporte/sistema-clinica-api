export interface ClinicsRepositoryInterface {
  findAll(...args: any[]): Promise<any>
  findFirst(...args: any[]): Promise<any>
}
