const express = require("express");
const router = express.Router();
const auth = require('../middleware/VerifyToken')
var controller = require('../controllers/user.controller');

router.post('/users', controller.register)

router.post('/users/login', controller.login)

router.get('/user', auth, controller.Verify)
module.exports = router