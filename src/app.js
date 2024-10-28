import express from 'express'
import dbConnection from './config/dbConnect.js'
import routes from './routes/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const connection = await dbConnection()
connection.on('error', (err) => {
    console.log(`Error connecting to the database: ${err}`)
})

connection.once('open', () => {
    console.log('Connected to MongoDB') 
})

const app = express()
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}))
routes(app)

export default app