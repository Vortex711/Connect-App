const mongoose = require('mongoose')
const { isAlphanumeric } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter the username!'],
        unique: true,
        lowercase: true,
        validate: [isAlphanumeric, 'Please enter a valid username!']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password!'],
        minlength: [6, 'Minimum password length is 6 characters!']
    },
    name: {
        type: String,
        required: [true, 'Please enter your name!']
    },
    age: {
        type: Number,
        required: [true, 'Please enter your age!']
    },
    gender: {
        type: String,
        required: [true, 'Please enter your gender!']
    },
    overallRatings: {
        appearance: {
            type: Number,
            default: 0.0
        },
        personality: {
            type: Number,
            default: 0.0
        }
    }
    
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt) 
    next()
})

userSchema.post('save', (doc, next) => {
    console.log("New user was created and saved!", doc)
    next()
})

userSchema.statics.login = async function (username, password) {
    
    const user = await this.findOne({username})

    if (user) {
        console.log('User exists!')
        console.log(user)
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            console.log('User authenticated!')
            return user
        }
        
        throw Error('Invalid password!')
    }
    throw Error('Invalid username!')
}

const Users = mongoose.model('user', userSchema)

module.exports = Users