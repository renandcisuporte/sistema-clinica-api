import { AppError } from '@/common/app.error'
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

export function authenticated(req: Request, _: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers
    const token = authorization!.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SUPER_SECRETS!) as any

    req.user = { ...decoded.user }
    req.clinicId = decoded.clinicId === '000-000' ? undefined : decoded.clinicId

    return next()
  } catch {
    throw new AppError('O Token JWT passado é inválido.')
  }
}
