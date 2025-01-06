import { authRouter } from '@/modules/auth/routes/auth-route'
import { chartRouter } from '@/modules/chart/routes/chart-route'
import { clinicRouter } from '@/modules/clinics/routes/clinic-route'
import { expenseRouter } from '@/modules/expenses/routes/expense-route'
import { peopleRouter } from '@/modules/peoples/routes/people-route'
import { productRouter } from '@/modules/products/routes/product-route'
import { realeseRouter } from '@/modules/realeses/routes/expense-route'
import { reportRouter } from '@/modules/reports/routes/report-route'
import { roomRouter } from '@/modules/rooms/routes/room-route'
import { serviceInProductRouter } from '@/modules/services-in-products/routes/service-in-product-route'
import { serviceRouter } from '@/modules/services/routes/service-route'
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
routes.use('/services', authenticated, serviceRouter)
routes.use('/products', authenticated, productRouter)
routes.use('/service', authenticated, serviceInProductRouter)
routes.use('/reports', authenticated, reportRouter)
// routes.use('/reports', reportRouter)

routes.use('/job', (req, res) => {
  let mail = 'mail'
  queue.mail.push({
    email: 'teste@teste.com',
    subject: 'teste',
    body: `[BODY] ${Math.random()}`
  })

  res.status(200).json({ mail, message: 'Trabalho adicionado à fila' })
})

routes.use('/', (req, res) => res.send('Bem vindo a API'))
