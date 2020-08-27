const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const VerifyToken = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, tokenPayload) => {
        if (err) {
          return res.status(401).json({ success: false, err: err.message })
        }
        const user = await User.findOne({
          email: tokenPayload.email
        })
        if (user) {
          req.user = user
          req.token = token
          next()
        } else {
          return res.status(401).json({ err: 'Authentication required' })
        }
      })
    } else {
      return res.status(401).json({ err: 'Authentication required' })
    }
  }

module.exports = VerifyToken