const express = require('express');
const router = express.Router();
const checkRedisCache = require("../Middleware/checkCache");
const propertyControllers = require('../Controllers/property.controllers');



router.get('/', checkRedisCache, propertyControllers.getProperties);
router.post('/', propertyControllers.addProperty);
router.put('/:uuid', propertyControllers.updateProperty);
router.delete('/:uuid', propertyControllers.removeProperty);
router.get('/cache-data', propertyControllers.catchPropertyData);

module.exports = router
