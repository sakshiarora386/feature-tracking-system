const { validationResult } = require('express-validator');

/**
 * Middleware to validate request data
 * Uses express-validator to check request body, params, or query
 * @param {Array} validations - Array of express-validator validation rules
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
    
    // Return 400 Bad Request with validation errors
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      statusCode: 400,
      details: formattedErrors,
    });
  };
};

module.exports = validate;