const express = require("express");
const router = express.Router();
const auth = require('../auth/auth')
var controller = require('../controllers/user.controller');

router.post('/users', controller.register)

router.post('/users/login', controller.login)

router.get('/', auth, controller.Verify)
module.exports = router