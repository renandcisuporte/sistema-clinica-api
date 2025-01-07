export interface Logger {
  log(key: string, data: Record<string, any>): Promise<void>
}

export class LoggerImp {
  async log(key: string, data: Record<string, any>): Promise<void> {
    console.log({ [key]: { ...data } })
  }
}
