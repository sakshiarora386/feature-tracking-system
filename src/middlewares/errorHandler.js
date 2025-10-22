/**
 * Global error handling middleware
 * Formats error responses consistently according to API compliance standards
 */
const { formatError } = require('../utils/responseFormatter');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Default to 500 server error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const details = err.details || null;
  
  // Format the error response using the utility function
  const errorResponse = formatError(message, code, statusCode, details);
  
  // Add stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;