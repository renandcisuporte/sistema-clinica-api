import { authenticated } from '@/infra/http/middlewares/authenticated'
import { processQueueMail, queue } from '@/shared/providers/queue'
import { Router } from 'express'
import { authRouter } from './auth-route'
import { chartRouter } from './chart-route'
import { clinicRouter } from './clinic-route'
import { peopleRouter } from './people-route'
import { roomRouter } from './room-route'
import { userRouter } from './user-route'
import { workTimeRouter } from './work-time.route'

const routes = Router()
export default routes

setInterval(processQueueMail, 1000)

routes.use('/auth', authRouter)
routes.use('/users', userRouter)
routes.use('/clinics', authenticated, chartRouter, clinicRouter, workTimeRouter)
routes.use('/rooms', authenticated, roomRouter)
routes.use('/peoples', authenticated, peopleRouter)
routes.use('/job', (req, res) => {
  let mail = 'mail'

  queue.mail.push({
    email: 'teste@teste.com',
    subject: 'teste',
    body: `[BODY] ${Math.random()}`
  })

  res.status(200).json({ mail, message: 'Trabalho adicionado à fila' })
})
