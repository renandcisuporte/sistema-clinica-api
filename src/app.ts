import cors from 'cors'
import 'dotenv/config'
import express, { Application } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import path from 'path'
import 'reflect-metadata'
import * as swaggerUI from 'swagger-ui-express'
import * as swaggerJson from '../public/swagger.json'
import { http } from './shared/http/middlewares/http'
import { validated } from './shared/http/middlewares/validated'
import routes from './shared/http/routes/index'

export const app: Application = express()

app.use(cors())
app.use(express.json({ limit: '5MB' }))
app.use(express.urlencoded({ limit: '5MB', extended: true }))
app.use(morgan('dev'))
// app.use(morgan(':ip'))
// app.use(morgan(':id :method :url :response-time'))
app.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: '1d' }))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson))
app.use('/api', routes)
app.use(validated, http)
