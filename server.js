import 'dotenv/config'
import app from './src/app.js'
import dbConnection from './src/config/dbConnect.js'

const PORT = 3000

async function startServer() {
    try {
        const { connection } = await dbConnection()
        
        if (!connection) {
            throw new Error('Database connection failed')
        }
            
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`)
            })

    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()