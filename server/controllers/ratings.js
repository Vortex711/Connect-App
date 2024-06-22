const Rating = require('../models/ratings')
const User = require('../models/users')
const mongoose = require('mongoose')

const updateRating = async (req, res) => {
    console.log("Updating rating")
    const { userId } = req.params
    const appearance = parseFloat(req.body.appearance)
    const personality = parseFloat(req.body.personality)
    const content = req.body.content
    console.log(userId, appearance, personality, content, res.locals.user)
    try {
        if (!res.locals.user) {
            return res.status(401).json({error: 'Not authenticated!'})
        }
        const user = await User.findById(userId)
        const rating = await Rating.create({reviewerUsername: res.locals.user.username, reviewedUsername: user.username, appearance, personality, content})
        console.log(rating)
        const updateRating = await User.findByIdAndUpdate(userId, {
            $inc: {
                appearanceSum: appearance, 
                personalitySum: personality, 
                ratingCount: 1 
            }, 
            $set: {
                appearance: (user.appearanceSum + appearance) / (user.ratingCount + 1),
                personality: (user.personalitySum + personality) / (user.ratingCount + 1)
            },
        }, { new: true });
        if (!updateRating) {
            res.status(400).json({'error': 'Not updated!'})
        }
        res.status(200).json(rating)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

const isRated = async (req, res) => {
    console.log('CHECKING IF RATED')
    const { username } = req.params
    console.log(username)
    
    if (username === res.locals.user.username) {
        return res.status(200).json({rated: true})
    }

    try {
        const rating = await Rating.findOne({reviewerUsername: res.locals.user.username, reviewedUsername: username})
        let status = {rated: false}
        if (rating) {
            status.rated = true
        } 
        console.log(status)
        return res.status(200).json(status)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const getReviews = async (req, res) => {
    console.log('GETTING REVIEWS')
    const {reviewedUsername} = req.params
    console.log(reviewedUsername)
    try {
        const reviews = await Rating.find({reviewedUsername: reviewedUsername}).sort({likes: -1})
        console.log(reviews)
        return res.status(200).json(reviews)
    } catch(err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const getRatings = async (req, res) => {
    console.log('GETTING RATINGS')
    const {reviewerUsername} = req.params
    console.log(reviewerUsername)
    try {
        const ratings = await Rating.find({reviewerUsername}).sort({likes: -1})
        console.log(ratings)
        return res.status(200).json(ratings)
    } catch(err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const deleteReview = async (req, res) => {
    console.log('DELETING REVIEW')
    const {reviewId} = req.body
    console.log(reviewId)
    try {
        const review = await Rating.findOneAndDelete({_id: reviewId})
        console.log(review)
        return res.status(200).json(review)
    } catch(err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

module.exports = { updateRating, isRated, getReviews, getRatings, deleteReview }