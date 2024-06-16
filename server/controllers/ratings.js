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
        const rating = await Rating.create({reviewerUsername: res.locals.user.username, reviewedUsername: user.username, appearance, personality})
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

module.exports = { updateRating, isRated }