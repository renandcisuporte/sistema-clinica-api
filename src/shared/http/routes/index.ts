import { authRouter } from '@/modules/auth/routes/auth-route'
import { chartRouter } from '@/modules/chart/routes/chart-route'
import { clinicRouter } from '@/modules/clinics/routes/clinic-route'
import { expenseRouter } from '@/modules/expenses/routes/expense-route'
import { peopleRouter } from '@/modules/peoples/routes/people-route'
import { realeseRouter } from '@/modules/realeses/routes/expense-route'
import { roomRouter } from '@/modules/rooms/routes/room-route'
import { userRouter } from '@/modules/users/routes/user-route'
import { workTimeRouter } from '@/modules/work-times/routes/work-time-route'
import { authenticated } from '@/shared/http/middlewares/authenticated'
import { queue } from '@/shared/providers/queue'
import { Router } from 'express'

const routes = Router()
export default routes

// setInterval(processQueueMail, 1000)

routes.use('/auth', authRouter)
routes.use('/users', userRouter)
routes.use('/clinics', authenticated, chartRouter, clinicRouter, workTimeRouter)
routes.use('/rooms', authenticated, roomRouter)
routes.use('/peoples', authenticated, peopleRouter)
routes.use('/expenses', authenticated, expenseRouter)
routes.use('/realeses', authenticated, realeseRouter)

routes.use('/job', (req, res) => {
  let mail = 'mail'
  queue.mail.push({
    email: 'teste@teste.com',
    subject: 'teste',
    body: `[BODY] ${Math.random()}`
  })

  res.status(200).json({ mail, message: 'Trabalho adicionado à fila' })
})
