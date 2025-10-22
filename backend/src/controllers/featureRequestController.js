const { PrismaClient } = require('@prisma/client');
const { formatSuccess, formatError } = require('../utils/responseFormatter');

const prisma = new PrismaClient();

/**
 * Create a new feature request
 * @route POST /api/v1/feature-requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
exports.createFeatureRequest = async (req, res, next) => {
  try {
    const { title, description, requestedBy, priority = 'Medium' } = req.body;

    // Create feature request in database
    const featureRequest = await prisma.featureRequest.create({
      data: {
        title,
        description,
        requestedBy,
        priority,
        // status defaults to 'New' as defined in the schema
      },
    });

    res.status(201).json(
      formatSuccess(
        featureRequest,
        'Feature request created successfully',
        201
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get all feature requests with filtering, sorting, and pagination
 * @route GET /api/v1/feature-requests
 */
exports.getAllFeatureRequests = async (req, res, next) => {
  try {
    // Extract query parameters with defaults
    const {
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
      priority,
      page = 1,
      limit = 10,
    } = req.query;

    // Convert page and limit to numbers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build filter object
    const where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;

    // Build sort object
    const orderBy = { [sortBy]: sortOrder.toLowerCase() };

    // Get total count for pagination
    const totalItems = await prisma.featureRequest.count({ where });

    // Get feature requests with filtering, sorting, and pagination
    const featureRequests = await prisma.featureRequest.findMany({
      where,
      orderBy,
      skip,
      take: limitNum,
    });

    // Calculate pagination values
    const totalPages = Math.ceil(totalItems / limitNum);

    const responseData = {
      data: featureRequests,
      pagination: {
        totalItems,
        currentPage: pageNum,
        totalPages,
        itemsPerPage: limitNum,
      },
    };

    res.status(200).json(
      formatSuccess(
        responseData,
        'Feature requests retrieved successfully',
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get a feature request by ID
 * @route GET /api/v1/feature-requests/:id
 */
exports.getFeatureRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find feature request by ID
    const featureRequest = await prisma.featureRequest.findUnique({
      where: { id },
    });

    // Check if feature request exists
    if (!featureRequest) {
      return res.status(404).json(
        formatError(
          `Feature request with ID ${id} not found`,
          'FEATURE_REQUEST_NOT_FOUND',
          404
        )
      );
    }

    res.status(200).json(
      formatSuccess(
        featureRequest,
        'Feature request retrieved successfully',
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update feature request status
 * @route PUT /api/v1/feature-requests/:id/status
 */
exports.updateFeatureRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedBy = req.body.updatedBy || 'System'; // In a real app, this would come from authenticated user

    // Check if feature request exists
    const existingRequest = await prisma.featureRequest.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      return res.status(404).json(
        formatError(
          `Feature request with ID ${id} not found`,
          'FEATURE_REQUEST_NOT_FOUND',
          404
        )
      );
    }

    // Update feature request status
    const updatedFeatureRequest = await prisma.featureRequest.update({
      where: { id },
      data: {
        status,
        updatedBy,
      },
    });

    res.status(200).json(
      formatSuccess(
        updatedFeatureRequest,
        'Feature request status updated successfully',
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a feature request
 * @route DELETE /api/v1/feature-requests/:id
 */
exports.deleteFeatureRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if feature request exists
    const existingRequest = await prisma.featureRequest.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      return res.status(404).json(
        formatError(
          `Feature request with ID ${id} not found`,
          'FEATURE_REQUEST_NOT_FOUND',
          404
        )
      );
    }

    // Delete feature request
    await prisma.featureRequest.delete({
      where: { id },
    });

    // Return 204 No Content status code for successful deletion
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};