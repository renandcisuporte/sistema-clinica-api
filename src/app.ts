import cors from 'cors'
import 'dotenv/config'
import express, { Application } from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import * as swaggerUI from 'swagger-ui-express'
import * as swaggerJson from '../public/swagger.json'
import { http } from './middleware/http'
import { validated } from './middleware/validated'
import { RegisterRoutes } from './routes'
import { routes } from './routes/index'

export const app: Application = express()

// morgan.token('id', function (req) {
//   return req.headers.authorization
// })

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
// app.use(morgan(':ip'))
// app.use(morgan(':id :method :url :response-time'))
app.use(['/docs'], swaggerUI.serve, swaggerUI.setup(swaggerJson))
app.use('/api', routes)
app.use(validated, http)
RegisterRoutes(routes)
