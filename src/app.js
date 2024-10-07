import express from 'express'
import dbConnection from './config/dbConnect.js'
import routes from './routes/index.js'
import cors from 'cors'

const connection = await dbConnection()
connection.on('error', (err) => {
    console.log(`Error connecting to the database: ${err}`)
})

connection.once('open', () => {
    console.log('Connected to MongoDB') 
})

const app = express()
app.use(cors())
routes(app)

export default app