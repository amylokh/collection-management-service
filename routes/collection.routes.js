const express = require('express');
const router = express.Router();
const CollectionController = require('../controllers/collection.controller');

//protect this route with auth api
router.post('/create', CollectionController.createCollection);

module.exports = router;
