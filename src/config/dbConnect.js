import mongoose from "mongoose"
import { GridFSBucket } from "mongodb"
import dns from "dns"

dns.setDefaultResultOrder('ipv4first')

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

async function dbConnection() {
    const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.eqwke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4,
            maxPoolSize: 10
        })
        console.log('Connected to MongoDB')

        const db = mongoose.connection.db
        const bucket = new GridFSBucket(db, {
            bucketName: 'uploads'
        })

        return { connection: mongoose.connection, bucket }
    } catch (error) {
        console.error('dbconnect Error:', {
            message: error.message,
            code: error.code,
            name: error.name
        })
        return { connection: null, bucket: null }
    }
}

export default dbConnection