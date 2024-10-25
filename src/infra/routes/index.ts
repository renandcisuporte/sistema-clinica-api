import { authenticated } from '@/infra/http/middleware/authenticated'
import { Router } from 'express'
import { authRouter } from './auth-route'
import { chartRouter } from './chart-route'
import { clinicRouter } from './clinic-route'
import { roomRouter } from './room-route'
import { userRouter } from './user-route'
import { workTimeRouter } from './work-time.route'

const routes = Router()
export default routes

routes.use('/auth', authRouter)
routes.use('/users', userRouter)
routes.use('/clinics', authenticated, chartRouter, clinicRouter, workTimeRouter)
routes.use('/rooms', authenticated, roomRouter)
