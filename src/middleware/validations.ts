import { AppError } from '@/common/app.error'
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const StatusCodes = {
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED_ERROR: 401
}

export const validateHttp = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error?'
  })
}

export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = err.errors.map((issue: any) => ({
          [`${issue.path.join('.')}`]: `${issue.path.join('.')} is ${
            issue.message
          }`
        }))
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid data', fields: errorMessages })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' })
      }
    }
  }
}
