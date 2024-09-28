export interface CreateRepositoryInterface {
  create(input: any): Promise<any>
}

export interface UpdateRepositoryInterface {
  update(id: any, input: any): Promise<any>
}

export interface DeleteRepositoryInterface {
  delete(id: any): Promise<void>
}

export interface FirstRepositoryInterface {
  first(id: any): Promise<any>
}

export interface AllRepositoryInterface {
  all(...args: any): Promise<any>
}
