const express = require('express')
const { getUsers, addUser, loginUser, logoutUser, getUser, findUsers, getCount } = require('../controllers/users')
const { requireAuth, checkUser } = require('../middleware/authMiddleware')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const router = express.Router()

// router.use(checkUser)

router.get('/home', getUsers)

router.get('/logout', logoutUser)

router.get('/count', getCount)

router.get('/:userId', getUser)

router.get('/username/:searchString', findUsers)

router.post('/signup', upload.single('image'), addUser)

router.post('/login', loginUser)

module.exports = router