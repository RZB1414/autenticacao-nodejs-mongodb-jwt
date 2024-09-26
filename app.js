require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express()
app.use(express.json())

const User = require('./models/User')

app.get('/', async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).send(allUsers)
    } catch (error) {
        res.status(500).send('Something went wrong in the server')
    }
})

function checkToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send('Access denied')
    }
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).send('Invalid token')
    }
    
}

app.get('/auth/register/:id', checkToken, async(req, res) => {
    const id = req.params.id
    const user = await User.findById(id, '-password')
    if (!user) {
        return res.status(404).send('User not found')
    }
    res.status(200).send(user)
}   )

app.post('/auth/register', async(req, res) => {
    const { name, email, password, confirmpassword } = req.body

    if(!name) {
        return res.status(400).send('Name and password are required')
    }
    if (!email) {
        return res.status(400).send('Email is required');
    }

    if (!password) {
        return res.status(400).send('Password is required');
    }

    if (password !== confirmpassword) {
        return res.status(400).send('Password does not match');
    }

    const userExists = await User.findOne({ email: email })
    
    if (userExists) {
        return res.status(400).send('User already exists')
    }

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: hashedPassword
    })

    try {
        await user.save()
        res.status(201).send('User created successfully')
    } catch (error) {
        res.status(500).send('Something went wrong in the server')
    }
})

app.post('/auth/login', async(req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).send('Email is required');
    }

    if (!password) {
        return res.status(400).send('Password is required');
    }

    const userExists = await User.findOne({ email: email })

    if (!userExists) {
        return res.status(400).send('Invalid credentials')
    }

    const validPassword = await bcrypt.compare(password, userExists.password)
    
    if (!validPassword) {
        return res.status(400).send('Invalid credentials')
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({ id: userExists._id }, secret)
        res.status(200).send(token)
    } catch (error) {
        res.status(500).send('Something went wrong in the server')
    }

})



const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.eqwke.mongodb.net/`)
.then(() => {
    const port = 3000
    app.listen(port, () => {
        console.log(`Mongo DB connected`)
        console.log(`Server is running on port ${port}`)
    })
}).catch((err => {
    console.log(err)
    
}))