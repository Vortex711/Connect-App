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
    appearance: {
        type: Number,
        required: true,
        set: value => parseFloat(value.toFixed(2))
    },
    personality: {
        type: Number,
        required: true,
        set: value => parseFloat(value.toFixed(2))
    },
    content: {
        type: String,
        default: ''
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const Ratings = mongoose.model('rating', ratingSchema)

module.exports = Ratings