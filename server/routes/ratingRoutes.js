const express = require('express')
const { updateRating, isRated, getReviews } = require('../controllers/ratings')
const { checkUser, requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(checkUser)
router.use(requireAuth)

router.patch('/rate/:userId', updateRating)

router.get('/:username', isRated)

router.get('/reviews/:reviewedUsername', getReviews)

module.exports = router