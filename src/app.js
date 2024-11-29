import express from 'express'
import routes from './routes/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(express.json())

routes(app)

export default app