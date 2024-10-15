import { authenticated } from '@/middleware/authenticated'
import { authenticationRouter } from '@/routes/authentication.route'
import { chartsRouter } from '@/routes/charts'
import { clinicsRouter } from '@/routes/clinics.route'
import { roomsRouter } from '@/routes/rooms.route'
import { workTimesRouter } from '@/routes/work-times.route'
import { Router } from 'express'

const routes = Router()
export default routes

routes.use('/auth', authenticationRouter)
routes.use(
  '/clinics',
  authenticated,
  chartsRouter,
  clinicsRouter,
  workTimesRouter
)

routes.use('/rooms', authenticated, roomsRouter)
