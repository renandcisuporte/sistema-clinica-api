export interface AuthenticationRefreshTokenResponseUseCase<T = any> {
  data: T
}

export interface AuthenticationRefreshTokenControllerInterface {
  handle(req: Request, res: Response): Promise<Response>
}

export interface AuthenticationRefreshTokenUseCaseInterface {
  execute(id: string): Promise<AuthenticationRefreshTokenResponseUseCase>
}
