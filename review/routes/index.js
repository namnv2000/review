const express = require("express");
const router = express.Router();
// const verify = require("../auth/checkToken")
var controller = require('../controllers/user.controller');

router.post('/api/user', controller.register)
// router.get('/', verify, controller.Verify)

router.post('/api/user/login', controller.login)
module.exports = router;