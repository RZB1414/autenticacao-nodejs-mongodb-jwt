import express from 'express'
import users from './usersRoutes.js'
import books from './booksRouters.js'

const routes = (app) => {
    app.route('/').get((req, res) => res.status(200).send(
        'Welcome to the Node.js, Express, and MongoDB API'
    ))

    app.use(express.json(), users, books)
}

export default routes