const express = require('express');
const router = express.Router();
const CollectionController = require('../controllers/collection.controller');
const verifyToken  = require('../services/auth-service');

//protect this route with auth api
router.post('/create', verifyToken, CollectionController.createCollection);
router.get('/getAll', verifyToken, CollectionController.getAllCollections)

module.exports = router;
