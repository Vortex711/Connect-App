const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    reviewerUsername: {
        type: String,
        required: true
    },
    reviewedUsername: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    content: {
        type: String
    }
}, { timestamps: true })

const Ratings = mongoose.model('rating', ratingSchema)

module.exports = Ratings