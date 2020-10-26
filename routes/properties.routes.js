const express = require('express');
const router = express.Router();
const verifyToken  = require('../services/auth-service');
const PropertiesController = require('../controllers/properties.controller');

//protect these routes with auth api
router.post('/create', verifyToken, PropertiesController.createProperty);
router.get('/get/:id?', verifyToken, PropertiesController.getProperty);
router.post('/update', verifyToken, PropertiesController.updateProperty);
router.delete('/:id?', verifyToken, PropertiesController.deleteProperty);

module.exports = router;
