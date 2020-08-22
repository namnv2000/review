const jwt = require('jsonwebtoken')
const User = require('../models/user.models')

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')

    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findOne({email: data.email})

        if (!user) {
            res.status(401).send('invalid jwt token');
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).send('invalid jwt token');
    }
}

module.exports = auth