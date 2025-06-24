const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

router.route('/:id').get(streamController.stream); 

module.exports = router;