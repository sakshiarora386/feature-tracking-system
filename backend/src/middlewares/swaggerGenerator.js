const fs = require('fs');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const config = require('../config/config');

/**
 * Middleware to generate Swagger specification JSON file
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.outputPath - Path where the Swagger JSON file will be saved
 * @param {boolean} options.generateOnStart - Whether to generate the file when the server starts
 * @param {boolean} options.enableEndpoint - Whether to enable an endpoint to trigger generation
 * @returns {Function} Express middleware
 */
function swaggerGenerator(options = {}) {
  // Default options
  const defaultOptions = {
    outputPath: path.join(process.cwd(), 'swagger.json'),
    generateOnStart: true,
    enableEndpoint: true
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  // Generate Swagger specification
  const generateSwaggerSpec = (req, res, next) => {
    try {
      // Get port from config or request
      const port = config.server.port;
      
      // Create Swagger options using the existing configuration
      const swaggerOptions = {
        definition: {
          openapi: '3.0.0',
          info: {
            title: config.swagger.title,
            version: config.swagger.version,
            description: config.swagger.description,
          },
          servers: [
            {
              url: `http://localhost:${port}/api/v1`,
              description: 'Development server',
            },
          ],
        },
        apis: ['./src/routes/*.js'], // Path to the API routes files
      };
      
      // Generate Swagger specification
      const swaggerSpec = swaggerJsDoc(swaggerOptions);
      
      // Write to file
      fs.writeFileSync(
        mergedOptions.outputPath,
        JSON.stringify(swaggerSpec, null, 2),
        'utf8'
      );
      
      console.log(`Swagger specification generated at: ${mergedOptions.outputPath}`);
      
      // If this was called as an endpoint handler, send a response
      if (res) {
        res.json({
          success: true,
          message: 'Swagger specification generated successfully',
          path: mergedOptions.outputPath
        });
      }
      
      // If this is middleware in the chain, continue
      if (next) {
        next();
      }
    } catch (error) {
      console.error('Error generating Swagger specification:', error);
      
      // If this was called as an endpoint handler, send an error response
      if (res) {
        res.status(500).json({
          success: false,
          message: 'Failed to generate Swagger specification',
          error: error.message
        });
      }
      
      // If this is middleware in the chain, pass the error
      if (next) {
        next(error);
      }
    }
  };
  
  // If generateOnStart is true, generate the spec immediately
  if (mergedOptions.generateOnStart) {
    generateSwaggerSpec();
  }
  
  // Return the middleware function
  return (req, res, next) => {
    // If enableEndpoint is true and the request is for the swagger generation endpoint
    if (
      mergedOptions.enableEndpoint &&
      req.method === 'GET' &&
      req.path === '/swagger-generate'
    ) {
      return generateSwaggerSpec(req, res);
    }
    
    // Otherwise, continue with the next middleware
    next();
  };
}

module.exports = swaggerGenerator;