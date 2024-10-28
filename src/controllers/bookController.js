import book from '../models/Book.js'

class BookController {

    static async getBooks(req, res) {
        try {
            const books = await book.find({})
            res.status(200).json(books)
            
        } catch (error) {
            res.status(500).json({ msg: "Something went wrong in the server", error: error.message })
        }
    }

    static async getBook(req, res) {
        const { id } = req.params
        try {
            const bookFound = await book.findOne({id : id})
            res.status(200).json(bookFound)
        } catch (error) {
            res.status(500).json({ msg: "Something went wrong in the server", error: error.message })
        }
    }

    static async createBook(req, res) {
        const { id, imgUrl, title, author, releaseDate, description, pageCount, users } = req.body

        if(!id) {
            return res.status(400).send('ID is required')
        }
        if(!imgUrl) {
            return res.status(400).send('Image URL is required')
        }
        if(!title) {
            return res.status(400).send('Title is required')
        }
        if(!author) {
            return res.status(400).send('Author is required')
        }

        const createdBook = {
            id,
            imgUrl,
            title,
            author,
            releaseDate,
            description,
            pageCount,
            users
        }

        try {
            const newBook = await book.create(createdBook)
            res.status(201).json({ msg: 'Book created successfully', newBook })
        } catch (error) {
            res.status(500).json({ msg: "Something went wrong in the server", error: error.message })
        }
    }

    static async deleteBook(req, res) {
        const { id } = req.params
        try {
            await book.findOneAndDelete({id : id})
            res.status(200).json({ msg: 'Book deleted successfully' })
        } catch (error) {
            res.status(500).json({ msg: "Something went wrong in the server", error: error.message })
        }
    }

    static async deleteAllBooks(req, res) {
        try {
            await book.deleteMany({})
            res.status(200).json({ msg: 'All books deleted successfully' })
        } catch (error) {
            res.status(500).json({ msg: "Something went wrong in the server", error: error.message })
        }
    }
}

export default BookController