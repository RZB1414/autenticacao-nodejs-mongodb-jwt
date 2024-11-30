import express from 'express'
import routes from './routes/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: '*', // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(cookieParser())
app.use(express.json())

app.use((req, res, next) => {
    req.setTimeout(10000, () => { 
        res.status(504).send('Request timed out')
    })
    next()
})

routes(app)

export default app