import { AppError } from '@/common/app.error'
import { verifyJwt } from '@/utils'
import { NextFunction, Request, Response } from 'express'

export function authenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers
  if (!authorization) throw new AppError('token jwt is missing.')

  try {
    const [, token] = authorization.split(' ')
    const { id } = verifyJwt(token)
    request.user = { id }
    return next()
  } catch {
    throw new AppError('token jwt invalid.')
  }
}
