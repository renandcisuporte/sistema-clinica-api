import cors from 'cors'
import express, { Application } from 'express'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

export default app
