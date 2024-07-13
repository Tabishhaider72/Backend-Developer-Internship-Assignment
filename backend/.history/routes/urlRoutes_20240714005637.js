// backend/routes/urlRoutes.js

const express = require('express');
const { createShortUrl, redirectUrl, getUrlAnalytics } = require('../controllers/urlController');

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/:shortCode', redirectUrl);
router.get('/analytics/:shortCode', getUrlAnalytics);

module.exports = router;
