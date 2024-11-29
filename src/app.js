import express from 'express'
import routes from './routes/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: 'https://react-autenticacao-nodejs-mongodb-jwt.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(cookieParser())
app.use(express.json())

routes(app)

export default app