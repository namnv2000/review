const express = require("express");
const router = express.Router();
const VerifyToken = require('../auth/VerifyToken')
var controller = require('../controllers/user.controller');

router.post('/users', controller.register)

router.post('/users/login', controller.login)

router.get('/user', VerifyToken, controller.Verify)
module.exports = router