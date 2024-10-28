import express from "express"
import checkToken from "../middlewares/checkToken.js"
import BookController from "../controllers/bookController.js"

const routes = express.Router()

routes.get('/auth/books', BookController.getBooks)
routes.get('/auth/book/:id', BookController.getBook)
routes.post('/auth/addBook', BookController.createBook)
// routes.patch('/auth/book/:id', BookController.updateBook)
routes.delete('/auth/book/:id', BookController.deleteBook)
routes.delete('/auth/books', BookController.deleteAllBooks)

export default routes