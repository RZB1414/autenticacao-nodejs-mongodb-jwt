import express from "express"
import checkToken from "../middlewares/checkToken.js"
import BookController from "../controllers/bookController.js"

const routes = express.Router()

routes.get('/auth/books', checkToken, BookController.getBooks)
routes.get('/auth/book/:id', checkToken, BookController.getBook)
routes.post('/auth/addBook', checkToken, BookController.createBook)
// routes.patch('/auth/book/:id', BookController.updateBook)
routes.delete('/auth/book/:id', checkToken, BookController.deleteBook)
routes.delete('/auth/books', checkToken, BookController.deleteAllBooks)

export default routes