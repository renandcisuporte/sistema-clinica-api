import app from './application'
import './routes'

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`Server is runing port http://localhost:${PORT}`)
})
