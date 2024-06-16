const express = require('express')
const { updateRating, isRated } = require('../controllers/ratings')
const { checkUser, requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(checkUser)
router.use(requireAuth)

router.patch('/rate/:userId', updateRating)

router.get('/:username', isRated)

module.exports = router