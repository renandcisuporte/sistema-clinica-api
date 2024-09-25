import app from './application'
import swaggerUi from 'swagger-ui-express'
import './routes'

const PORT = process.env.PORT || 9000

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  })
)

app.listen(PORT, () =>
  console.log(`Server is runing port http://localhost:${PORT}`)
)
