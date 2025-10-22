const express = require('express');
const router = express.Router();
const { formatSuccess } = require('../utils/responseFormatter');

// Import route modules
const featureRequestRoutes = require('./featureRequests');

// Mount routes
router.use('/feature-requests', featureRequestRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json(
    formatSuccess(
      { uptime: process.uptime() },
      'API is running',
      200
    )
  );
});

module.exports = router;