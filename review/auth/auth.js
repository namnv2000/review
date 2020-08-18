const jwt = require('jsonwebtoken')
const User = require('../models/user.modal')

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')

    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })

        if (!user) {
            res.status(401).send('invalid jwt token');
        }

        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send('invalid jwt token');
    }
}

module.exports = auth