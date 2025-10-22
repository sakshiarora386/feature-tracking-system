/**
 * Global error handling middleware
 * Formats error responses consistently
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Default to 500 server error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || null;
  
  // Format the error response
  const errorResponse = {
    status: 'error',
    message,
    statusCode,
  };
  
  // Add details if they exist
  if (details) {
    errorResponse.details = details;
  }
  
  // Add stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;