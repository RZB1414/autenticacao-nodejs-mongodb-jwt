import mongoose from "mongoose"

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

async function dbConnection() {
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.eqwke.mongodb.net/`)
    return mongoose.connection
}

export default dbConnection