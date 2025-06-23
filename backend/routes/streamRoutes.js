const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

router.route('/').get(streamController.stream); 

module.exports = router;