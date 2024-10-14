import { authenticated } from '@/middleware/authenticated'
import { authenticationRouter } from '@/routes/authentication.route'
import { clinicsRouter } from '@/routes/clinics.route'
import { roomsRouter } from '@/routes/rooms.route'
import { Router } from 'express'
import { workTimesRouter } from './work-times.route'

const routes = Router()
export default routes

routes.use('/auth', authenticationRouter)
routes.use('/clinics', authenticated, clinicsRouter, workTimesRouter)
routes.use('/rooms', authenticated, roomsRouter)
