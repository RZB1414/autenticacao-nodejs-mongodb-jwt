import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    id: { type: String, required: true },
    imgUrl: { type: String, required: true },
    title: { type: String, required: true },
    author: [{ type: String, required: true }],
    releaseDate: { type: Date },
    description: { type: String },
    pageCount: { type: Number },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })

const book = mongoose.model('books', bookSchema)

export default book