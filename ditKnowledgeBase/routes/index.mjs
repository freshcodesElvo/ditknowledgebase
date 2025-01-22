const express = require('express');
const router = express.Router();

// Import routes
//const propertyRoutes = require('./properties');
const articlesRoutes = require('./articles');
const dialogflowWebhook = require('../controllers/dialogflowWebhook.mjs');

// Use routes
//router.use('/api/properties', propertyRoutes);
router.use('/api/articles', articlesRoutes);
router.use('/webhook', dialogflowWebhook);

module.exports = router;
