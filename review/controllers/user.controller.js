const jwt = require("jsonwebtoken")
const User = require("../models/user.models")

module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body
        let user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        user = JSON.parse(JSON.stringify(user));
        user['token'] = token;
        delete user['password']
        res.send({user})
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
};

module.exports.register = async function (req, res) {
    try {
        let user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        user = JSON.parse(JSON.stringify(user));
        user['token'] = token;
        delete user['password']
        res.status(201).send({ user })
    } catch (error) {
        res.status(400).send(error)
    }
};

module.exports.Verify = async function (req, res) {
    let user = req.user
    const token = await user.generateAuthToken()
    user = JSON.parse(JSON.stringify(user));
    delete user['password']
    user['token'] = token;
    res.send({user})
}