const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
    reviewId: {
        type: String,
        required: true
    }, 
    likerId: {
        type: String,
        required: true
    }
})

const Likes = mongoose.model('like', likesSchema)

module.exports = Likes