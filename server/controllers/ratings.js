const Rating = require('../models/ratings')
const User = require('../models/users')
const mongoose = require('mongoose')

const ratingsPerPage = 2
const reviewsPerPage = 5

const addRating = async (req, res) => {
    console.log('ADDING RATING')
    const appearance = parseFloat(req.body.appearance)
    const personality = parseFloat(req.body.personality)
    const { content, userId } = req.body
    console.log(userId, appearance, personality, content, res.locals.user)
    try {
        if (!res.locals.user) {
            return res.status(401).json({error: 'Not authenticated!'})
        }
        const user = await User.findById(userId)
        const rating = await Rating.create({reviewerUsername: res.locals.user.username, reviewedUsername: user.username, appearance, personality, content})
        console.log(rating)
        res.status(200).json(rating)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

const updateRating = async (req, res) => {
    console.log("Updating rating")
    const { review, remove } = req.body
    console.log(review, remove)
    try {
        if (!res.locals.user) {
            return res.status(401).json({error: 'Not authenticated!'})
        }
        const user = await User.findOne({username: review.reviewedUsername})
        let updateRating
        if (remove) {
            updateRating = await User.findOneAndUpdate({username: review.reviewedUsername} , {
                $inc: {
                    appearanceSum: -review.appearance, 
                    personalitySum: -review.personality, 
                    ratingCount: -1 
                }, 
                $set: {
                    appearance: (user.appearanceSum - review.appearance) / (user.ratingCount - 1),
                    personality: (user.personalitySum - review.personality) / (user.ratingCount - 1)
                },
            }, { new: true });
        } else{
            updateRating = await User.findOneAndUpdate({username: review.reviewedUsername} , {
                $inc: {
                    appearanceSum: review.appearance, 
                    personalitySum: review.personality, 
                    ratingCount: 1 
                }, 
                $set: {
                    appearance: (user.appearanceSum + review.appearance) / (user.ratingCount + 1),
                    personality: (user.personalitySum + review.personality) / (user.ratingCount + 1)
                },
            }, { new: true });
        }
        if (!updateRating) {
            res.status(400).json({'error': 'Not updated!'})
        }
        res.status(200).json(review)
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
    const p = req.query.p || 0
    console.log(reviewedUsername, p)
    try {
        const reviews = await Rating.find({reviewedUsername: reviewedUsername}).sort({likes: -1, dislikes: 1, createdAt: -1}).skip(p * reviewsPerPage).limit(reviewsPerPage)
        console.log(reviews)
        return res.status(200).json(reviews)
    } catch(err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const getReviewsCount = async (req, res) => {
    console.log('GETTING REVIEWS COUNT')
    const {reviewedUsername} = req.params
    try {
        const reviewsCount = await Rating.find({reviewedUsername}).sort({likes: -1, dislikes: 1, createdAt: -1}).countDocuments()
        console.log(reviewsCount)
        const pageCount = Math.ceil(reviewsCount / reviewsPerPage)
        return res.status(200).json(pageCount)
    } catch(err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const getRatings = async (req, res) => {
    console.log('GETTING RATINGS')
    const {reviewerUsername} = req.params
    const p = req.query.p || 0
    console.log(reviewerUsername, p)
    try {
        const ratings = await Rating.find({reviewerUsername}).sort({likes: -1, dislikes: 1, createdAt: -1}).skip(p * ratingsPerPage).limit(ratingsPerPage)
        console.log(ratings)
        return res.status(200).json(ratings)
    } catch(err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const getRatingsCount = async (req, res) => {
    console.log('GETTING RATINGS COUNT')
    const {reviewerUsername} = req.params
    try {
        const ratingsCount = await Rating.find({reviewerUsername}).sort({likes: -1, dislikes: 1, createdAt: -1}).countDocuments()
        console.log(ratingsCount)
        const pageCount = Math.ceil(ratingsCount / ratingsPerPage)
        return res.status(200).json(pageCount)
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

module.exports = { addRating, updateRating, isRated, getReviews, getRatings, deleteReview, getRatingsCount, getReviewsCount }