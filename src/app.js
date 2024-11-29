import express from 'express'
import routes from './routes/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const allowedOrigins = [
    'https://react-autenticacao-nodejs-mongodb-jwt.vercel.app',
    'https://react-autenticacao-nodejs-mongodb-3ma0tvsyi-rzb1414s-projects.vercel.app'
]

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, origin)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(cookieParser())
app.use(express.json())

routes(app)

export default app