const { validationResult } = require('express-validator');
const { formatError } = require('../utils/responseFormatter');

/**
 * Middleware to validate request data
 * Uses express-validator to check request body, params, or query
 * @param {Array} validations - Array of express-validator validation rules
 * @returns {Function} Express middleware function
 */
const validate = (validations) => {
  return async (req, res, next) => {
    // Execute all validations
    await Promise.all(validations.map(validation => validation.run(req)));
    
    // Check for validation errors
    const errors = validationResult(req);
    
    // If no errors, continue to the next middleware
    if (errors.isEmpty()) {
      return next();
    }
    
    // Format validation errors
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));
    
    // Return 400 Bad Request with validation errors using the formatter
    return res.status(400).json(
      formatError(
        'Validation error',
        'VALIDATION_ERROR',
        400,
        formattedErrors
      )
    );
  };
};

module.exports = validate;