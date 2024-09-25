import { app } from './app'
import { RegisterRoutes } from './routes'

const PORT = process.env.PORT || 9000
app.listen(PORT, () =>
  console.log(`Server is runing port http://localhost:${PORT}`)
)

RegisterRoutes(app)
