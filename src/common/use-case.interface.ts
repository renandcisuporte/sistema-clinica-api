export interface ResponseInterface<T = any> {
  data: T
}

export interface CreateUseCaseInterface {
  execute(input: any): Promise<any>
}

export interface UpdateUseCaseInterface {
  execute(id: any, input: any): Promise<any>
}

export interface DeleteUseCaseInterface {
  execute(id: any): Promise<void>
}

export interface FirstUseCaseInterface {
  execute(input: any): Promise<any>
}

export interface AllUseCaseInterface {
  execute(...args: any): Promise<any>
}
