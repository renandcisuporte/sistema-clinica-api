import cors from 'cors'
import 'dotenv/config'
import express, { Application } from 'express'
import 'express-async-errors'
import * as swaggerUI from 'swagger-ui-express'
import * as swaggerJson from '../public/swagger.json'
// import { RegisterRoutes } from './routes'

import { validateHttp } from './middleware/validations'
import { routes } from './routes/index'

export const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(['/docs'], swaggerUI.serve, swaggerUI.setup(swaggerJson))
app.use('/api', routes)
app.use(validateHttp)
