const express = require('express')
const { checkUser, requireAuth } = require('../middleware/authMiddleware')
const { addLike, updateLike, checkLiked, removeLike } = require('../controllers/likes')

const router = express.Router()

router.use(checkUser)
router.use(requireAuth)

router.post('/add', addLike)

router.patch('/update', updateLike)

router.get('/check/:reviewId', checkLiked)

router.delete('/remove', removeLike)

module.exports = router