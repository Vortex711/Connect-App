const express = require('express')
const { updateRating } = require('../controllers/ratings')
const { checkUser } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(checkUser)

router.patch('/rate/:userId', updateRating)

router.get('/:userId')

module.exports = router