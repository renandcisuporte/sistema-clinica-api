import { validated } from '@/middleware/validated'
import {
  authenticationController,
  authRefrshTokenController
} from '@/use-cases/authentication'
import { authenticationSchema } from '@/use-cases/authentication/authentication.schema'
import { Router } from 'express'

export const authenticationRouter = Router()

authenticationRouter
  .post('/', validated(authenticationSchema), (req, rep) =>
    authenticationController.handle(req, rep)
  )
  .post('/refresh-token', (req, rep) =>
    authRefrshTokenController.handle(req, rep)
  )
