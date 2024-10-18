import { formatErrors } from '@/utils'
import { NextFunction, Request, Response } from 'express'

import { AnyZodObject, ZodError } from 'zod'

export const StatusCodes = {
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED_ERROR: 401
}

export function validated(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = formatErrors(err.errors)
        return res.status(BAD_REQUEST).json({
          statusCode: BAD_REQUEST,
          errorMessage: 'Há campos inválidos',
          fields: { ...errorMessages }
        })
      }

      res.status(INTERNAL_SERVER_ERROR).json({
        errorMessage: 'Erro interno no servidor',
        statusCode: INTERNAL_SERVER_ERROR
      })
    }
  }
}
