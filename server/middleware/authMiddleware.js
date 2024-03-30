const jwt = require('jsonwebtoken')

const secret = process.env.SECRET
const requireAuth = (req, res, next) => {
    console.log('REQUIRE AUTH')
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.status(401).json({error: 'Unverified'})
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else { 
        res.status(401).json({error: 'No token'})
    }
} 

module.exports = requireAuth