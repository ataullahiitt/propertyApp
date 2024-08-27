const express = require('express');
const router = express.Router();
const userControllers = require('../Controllers/user.controllers');
const authorize = require('../Middleware/authorize');


router.get('/', authorize, userControllers.getUsers);
router.post('/', userControllers.validate('createUser'), userControllers.addUser);
router.put('/:uuid', authorize, userControllers.validate('updateUser'), userControllers.updateUser);
router.delete('/:uuid', authorize, userControllers.removeUser);

module.exports = router
