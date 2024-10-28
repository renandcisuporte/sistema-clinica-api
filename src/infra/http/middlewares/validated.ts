import { formatErrors } from '@/shared/utils'
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
        headers: req.headers,
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = formatErrors(err.errors)
        console.log(errorMessages)
        return res.status(BAD_REQUEST).json({
          statusCode: BAD_REQUEST,
          errorMessage: 'Há campos inválidos',
          fields: { ...errorMessages }
        })
      }

      res.status(INTERNAL_SERVER_ERROR).json({
        errorMessage: 'ERRO INTERNO NO SERVIDOR',
        statusCode: INTERNAL_SERVER_ERROR
      })
    }
  }
}
