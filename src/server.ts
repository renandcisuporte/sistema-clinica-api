import { app } from '@/app'

const PORT = process.env.PORT || 9000
const start = (): void => {
  try {
    app.listen(PORT, () =>
      console.log(`Server is runing port http://localhost:${PORT}`)
    )
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
start()
