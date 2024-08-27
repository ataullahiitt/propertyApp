const express = require('express');
const router = express.Router();
const loginControllers = require('../Controllers/login.controllers');

router.post('/', loginControllers.validate('login'), loginControllers.userLogin);

module.exports = router
