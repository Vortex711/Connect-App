const express = require('express')
const { checkUser, requireAuth } = require('../middleware/authMiddleware')
const { addDislike, updateDislike, checkDisliked, removeDislike } = require('../controllers/dislikes')

const router = express.Router()

router.use(checkUser)
router.use(requireAuth)

router.post('/add', addDislike)

router.patch('/update', updateDislike)

router.get('/check/:reviewId', checkDisliked)

router.delete('/remove', removeDislike)

module.exports = router