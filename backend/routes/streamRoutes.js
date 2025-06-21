const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

router.route('/').get(streamController.stream); // ✅ POZIV FUNKCIJE KADA SE RUTA POGODI

module.exports = router;