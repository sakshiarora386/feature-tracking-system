const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  
  // Database configuration
  database: {
    url: process.env.DATABASE_URL || 'file:./dev.db',
  },
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // 100 requests per window
  },
  
  // CORS configuration
  cors: {
    // In development, allow all origins
    // In production, restrict to specific origins
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'] 
      : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  
  // Swagger configuration
  swagger: {
    title: 'Feature Tracking System API',
    version: '1.0.0',
    description: 'API for tracking feature requests',
  },
};

module.exports = config;