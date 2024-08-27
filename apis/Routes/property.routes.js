const express = require('express');
const router = express.Router();
const propertyControllers = require('../Controllers/property.controllers');


router.get('/', propertyControllers.getProperties);
router.post('/', propertyControllers.addProperty);
router.put('/:uuid', propertyControllers.updateProperty);
router.delete('/:uuid', propertyControllers.removeProperty);

module.exports = router
