const Dislike = require('../models/dislikes')
const Rating = require('../models/ratings')

const addDislike = async (req, res) => {
    console.log('ADDING DISLIKE')
    const {reviewId} = req.body;
    try {
        const dislike = await Dislike.create({reviewId, dislikerId: res.locals.user._id})
        console.log(dislike)
        return res.status(200).json(dislike)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const updateDislike = async (req, res) => {
    console.log('UPDATING DISLIKE')
    const {reviewId, disliked } = req.body;
    const value = disliked ? -1 : 1
    try {
        const updated = await Rating.findOneAndUpdate({_id: reviewId}, {$inc: {dislikes: value}}, {new: true})
        console.log('Updated review: ')
        console.log(updated)
        return res.status(200).json(updated)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const checkDisliked = async (req, res) => {
    console.log('CHECKING DISLIKED')
    const { reviewId } = req.params
    try {
        const dislike = await Dislike.findOne({reviewId, dislikerId: res.locals.user._id})
        console.log(dislike ? true : false)
        if (dislike) {
            return res.status(200).json({disliked: true})
        } else {
            return res.status(200).json({disliked: false})
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const removeDislike = async (req, res) => {
    console.log('REMOVING DISLIKE')
    const { reviewId } = req.body
    try {
        const status = await Dislike.findOneAndDelete({reviewId, dislikerId: res.locals.user._id})
        console.log(status)
        return res.status(200).json(status)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

module.exports = { addDislike , updateDislike, removeDislike, checkDisliked }