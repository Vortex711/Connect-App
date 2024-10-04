const jwt = require('jsonwebtoken')
const User = require('../models/users')

const requireAuth = (req, res, next) => {
    console.log('REQUIRE AUTH');
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                console.log('JWT verification error:', err.message);
                res.status(401).json({ error: 'Unverified' });
            } else {
                console.log('Decoded Token:', decodedToken);
                next();
            }
        });
    } else { 
        console.log('No token found');
        res.status(401).json({ error: 'No token' });
    }
}; 

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('CHECKING user...');

    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                console.log('JWT verification error:', err.message);
                res.locals.user = null;
                next();
            } else {
                console.log('Decoded Token:', decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        console.log('No token found');
        res.locals.user = null;
        next();
    }
};


module.exports = {requireAuth, checkUser}