const express = require('express');
const router = express.Router();
const getAll = require('../controllers/getAll')


router.route('/').get(getAll.getAllVideos)

module.exports = router;