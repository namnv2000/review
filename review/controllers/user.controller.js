const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body
        let users = await User.findByCredentials(email, password)
        if (!users) {
            return res.status(422).send({errors: {body: [error.message]}})
        }
        const token = await users.generateAuthToken()
        let user = {
            email: users.email,
            token: token,
            username: users.username,
            bio: users.bio,
            image: users.image
        }
        res.status(200).send({user})
    } catch (error) {
        res.status(422).send({errors: {body: [error.message]}})
    }
};

module.exports.register = async function (req, res) {
    try {
        let users = new User(req.body)
        await users.save()
        const token = await users.generateAuthToken()
        let user = {
            email: users.email,
            token: token,
            username: users.username,
            bio: users.bio,
            image: users.image
        }
        res.status(201).send({ user })
    } catch (error) {
        res.status(422).send({errors: {body: [error.message]}})
    }
};

module.exports.Verify = async function (req, res) {
    try {
        let users = req.user
        if (users) {
            const token = req.token
            let user = {
                email: users.email,
                token: token,
                username: users.username,
                bio: users.bio,
                image: users.image
            }
            res.status(200).send({user})
        }else {
            res.status(401).send({errors: {body: [error.message]}})
        }
    } catch (error) {
        res.status(422).send({errors: {body: [error.message]}})
    }
}