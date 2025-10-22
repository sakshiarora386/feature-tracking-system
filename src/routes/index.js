const express = require('express');
const router = express.Router();

// Import route modules
const featureRequestRoutes = require('./featureRequests');

// Mount routes
router.use('/feature-requests', featureRequestRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
  });
});

module.exports = router;