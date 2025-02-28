import { app } from '@/app'

const PORT = process.env.PORT || 3333
const start = (): void => {
  try {
    app.listen(PORT, () =>
      console.log(`Server is runing port http://localhost:${PORT}`)
    )
  } catch (error) {
    console.error('[START]: %s', error)
    process.exit(1)
  }
}

start()
