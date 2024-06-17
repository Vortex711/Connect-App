const mongoose = require('mongoose')

const dislikesSchema = new mongoose.Schema({
    reviewId: {
        type: String,
        required: true
    }, 
    dislikerId: {
        type: String,
        required: true
    }
})

const Dislikes = mongoose.model('dislike', dislikesSchema)

module.exports = Dislikes