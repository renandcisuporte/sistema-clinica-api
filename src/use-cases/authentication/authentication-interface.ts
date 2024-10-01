export interface AuthenticationResponseUseCase<T = any> {
  data: T
}

export interface AuthenticationIntefaceDTO {
  email: string
  password: string
}

export interface AuthenticationControllerInterface {
  handle(req: Request, res: Response): Promise<Response>
}

export interface AuthenticationUseCaseInterface {
  execute(
    input: AuthenticationIntefaceDTO
  ): Promise<AuthenticationResponseUseCase>
}
