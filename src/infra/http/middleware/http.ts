import { AppError } from '@/infra/http/error/app.error'
import { NextFunction, Request, Response } from 'express'

export const http = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log('ERROR: %s', JSON.stringify(err, null, 2))

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      errorMessage: err.message
    })
  }

  return res.status(500).json({
    statusCode: 500,
    errorMessage: 'Erro interno no servidor'
  })
}
