interface ResponseInterface<T = any> {
  data: T
}

export interface CreateUseCaseInterface {
  execute(input: any): Promise<ResponseInterface>
}

export interface UpdateUseCaseInterface {
  execute(id: any, input: any): Promise<ResponseInterface>
}

export interface DeleteUseCaseInterface {
  execute(id: any): Promise<void>
}

export interface FirstUseCaseInterface {
  execute(input: any): Promise<ResponseInterface>
}

export interface AllUseCaseInterface {
  execute(...args: any): Promise<ResponseInterface>
}
