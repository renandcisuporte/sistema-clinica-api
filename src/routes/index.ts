import { authenticated } from '@/middleware/authenticated'
import { authenticationRouter } from '@/routes/authentication.route'
import { clinicsRouter } from '@/routes/clinics.route'
import { roomsRouter } from '@/routes/rooms.route'
import { Router } from 'express'

export const routes = Router()

routes.use('/auth', authenticationRouter)
routes.use('/clinics', authenticated, clinicsRouter)
routes.use('/rooms', authenticated, roomsRouter)
