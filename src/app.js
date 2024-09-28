import express from 'express'
import dbConnection from './config/dbConnect.js'
import routes from './routes/index.js'

const connection = await dbConnection()
connection.on('error', (err) => {
    console.log(`Error connecting to the database: ${err}`)
})

connection.once('open', () => {
    console.log('Connected to MongoDB') 
})

const app = express()
routes(app)

export default app