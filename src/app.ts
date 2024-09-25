import cors from 'cors'
import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'

export const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  })
)
