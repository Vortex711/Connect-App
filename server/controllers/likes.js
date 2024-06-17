const Like = require('../models/likes')
const Rating = require('../models/ratings')

const addLike = async (req, res) => {
    console.log('ADDING LIKE')
    const {reviewId} = req.body;
    try {
        const like = await Like.create({reviewId, likerId: res.locals.user._id})
        console.log(like)
        return res.status(200).json(like)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const updateLike = async (req, res) => {
    console.log('UPDATING LIKE')
    const {reviewId, liked } = req.body;
    const value = liked ? -1 : 1
    try {
        const updated = await Rating.findOneAndUpdate({_id: reviewId}, {$inc: {likes: value}}, {new: true})
        console.log('Updated review: ')
        console.log(updated)
        return res.status(200).json(updated)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const checkLiked = async (req, res) => {
    console.log('CHECKING LIKED')
    const { reviewId } = req.params
    try {
        const like = await Like.findOne({reviewId, likerId: res.locals.user._id})
        if (like) {
            return res.status(200).json({liked: true})
        } else {
            return res.status(200).json({liked: false})
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const removeLike = async (req, res) => {
    console.log('REMOVING LIKE')
    const { reviewId } = req.body
    try {
        const status = await Like.findOneAndDelete({reviewId, likerId: res.locals.user._id})
        console.log(status)
        return res.status(200).json(status)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

module.exports = { addLike , updateLike, checkLiked, removeLike}