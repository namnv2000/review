const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findOne({email: data.email})

        if (!user) {
            res.status(401).send('Unauthorized');
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).send('Unauthorized')
    }
}

module.exports = auth