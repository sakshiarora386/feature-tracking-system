/**
 * Utility functions for formatting API responses consistently
 * according to API compliance standards
 */

/**
 * Format a successful response
 * @param {any} data - The data to include in the response
 * @param {string} message - A descriptive message about the operation
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {Object} Formatted response object
 */
exports.formatSuccess = (data, message, statusCode = 200) => {
  return {
    success: true,
    message,
    data,
    statusCode
  };
};

/**
 * Format an error response
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {number} statusCode - HTTP status code (default: 400)
 * @param {Object} details - Additional error details (optional)
 * @returns {Object} Formatted error response object
 */
exports.formatError = (message, code, statusCode = 400, details = null) => {
  const response = {
    success: false,
    message,
    code,
    statusCode
  };

  if (details) {
    response.details = details;
  }

  return response;
};