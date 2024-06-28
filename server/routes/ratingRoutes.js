const express = require('express')
const { updateRating, isRated, getReviews, getRatings, deleteReview, addRating, getRatingsCount, getReviewsCount } = require('../controllers/ratings')
const { checkUser, requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(checkUser)
router.use(requireAuth)

router.post('/rate', addRating)

router.patch('/updateUser', updateRating)

router.get('/rating/:username', isRated)

router.get('/reviews/:reviewedUsername', getReviews)

router.get('/reviews/count/:reviewedUsername', getReviewsCount)

router.get('/:reviewerUsername', getRatings)

router.get('/count/:reviewerUsername', getRatingsCount)

router.delete('/delete', deleteReview)

module.exports = router