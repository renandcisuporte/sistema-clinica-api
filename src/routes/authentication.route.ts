import { validate } from '@/middleware/validations'
import { authenticationController } from '@/use-cases/authentication'
import { authenticationSchema } from '@/use-cases/authentication/authentication.schema'
import { Router } from 'express'

export const authenticationRouter = Router()

authenticationRouter.post('/', validate(authenticationSchema), (req, rep) =>
  authenticationController.handle(req, rep)
)
