import { routerAuth } from '@/modules/auth/routes'
import { routerClinic } from '@/modules/clinics/routes'
import { routerUser } from '@/modules/users/routes'
import { Router } from 'express'

export const routes = Router()

routes.use('/auth', routerAuth)
routes.use('/users', routerUser)
routes.use('/clinics', routerClinic)
