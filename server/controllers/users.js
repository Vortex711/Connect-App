const User = require('../models/users')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')

const usersPerPage = 8

const handleSignUpErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { 'username': '', 'password': '', 'name': '', 'age': '', 'gender': ''}

    if (err.code === 11000) {
        errors.username = 'User already exists!'
        return errors
    }

    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties.path)
            errors[properties.path] = properties.message
        });
    }
    return errors
}

const handleLoginErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { 'username': '', 'password': ''}

    if (err.message === 'Invalid username!') {
        errors['username'] = err.message
    } 

    if (err.message === 'Invalid password!') {
        errors['password'] = err.message
    } 

    return errors
}

const secret = process.env.SECRET
const maxAge = 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: maxAge
    })
}

const getUsers = async (req, res) => {
    console.log('GET USERS')
    console.log(req.query.p)
    const page = parseInt(req.query.p) || 0
    console.log(page)
    const users = await User.find({_id: { $ne : res.locals.user._id}}).sort({createdAt: -1}).skip(page * usersPerPage).limit(usersPerPage)
    console.log(users)
    res.status(200).json(users)
}

const getUser =  async (req, res) => {
    console.log('GET SINGLE USER')
    const { userId } = req.params
    console.log(userId)
    try {
        const user = await User.findById(userId)
        console.log(user)
        return res.status(200).json(user)
    } catch(err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const findUsers = async (req, res) => {
    const { searchString } = req.params
    console.log(`FIND USERS WITH ${searchString}`)
    try {
        const regex = new RegExp(searchString, 'i');
        const users = await User.find({_id: { $ne : res.locals.user._id}, username: { $regex: regex } }).limit(15);
        console.log(users)
        return res.status(200).json(users)
    } catch (err) {
        console.error('Error finding users by username:', err);
        return res.status(400).json(err)
    }
}

const getCount = async (req, res) => {
    console.log('GETTING PAGE COUNT')
    try{
        const userCount = await User.countDocuments() 
        const pageCount = Math.ceil((userCount - 1) / usersPerPage)
        res.status(200).json(pageCount)
    } catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

const addUser = async (req, res) => {
    console.log('POST USER')
    const {username, password, name, age, gender} = req.body
    console.log(username)
    try{
        let user
        if (!req.file) {
            user = await User.create({username, password, name, age, gender })
        } else {
            // Compress and resize the image using sharp before converting to base64
            const compressedImageBuffer = await sharp(req.file.buffer)
                .rotate()  // Automatically corrects orientation based on EXIF data
                .resize({ width: 800 })  // Resize to a width of 800px (maintains aspect ratio)
                .jpeg({ quality: 70 })   // Convert to JPEG with 70% quality to compress
                .toBuffer();             // Convert the image to buffer

            // Convert the compressed image buffer to base64
            const image = compressedImageBuffer.toString('base64');
            user = await User.create({username, password, name, image, age, gender})
        }
        res.status(201).json({user: user._id})
    } catch(err){
        const errors = handleSignUpErrors(err)
        console.log(errors)
        res.status(400).json(errors)
    }
}

const loginUser = async (req, res) => {
    console.log('LOGIN USER')
    const {username, password} = req.body
    console.log(username, password)
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true, secure: true ,maxAge: maxAge * 1000, sameSite: 'None'
        })
        console.log(res.cookie.jwt)
        res.status(200).json({user: user._id, token: token})
    }
    catch(err) {
        const errors = handleLoginErrors(err)
        res.status(400).json(errors)
    }
}

const editUser = (req, res) => {
    console.log('EDITING USER')
    
}

const logoutUser = (req, res) => {
    console.log('LOGGING OUT')
    res.cookie('jwt', '', { maxAge: 1 / 1000 })
    res.status(200).json('Done')
}

module.exports = { getUsers, getUser, addUser , loginUser, logoutUser, findUsers, getCount}
