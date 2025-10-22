const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const featureRequestController = require('../controllers/featureRequestController');
const validate = require('../middlewares/validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     FeatureRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the feature request
 *         title:
 *           type: string
 *           description: The title of the feature request
 *         description:
 *           type: string
 *           description: Detailed description of the feature
 *         requestedBy:
 *           type: string
 *           description: User who requested the feature
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High, Critical]
 *           description: Priority level of the feature request
 *         status:
 *           type: string
 *           enum: [New, Open, InProgress, UnderReview, Completed, Rejected]
 *           description: Current status of the feature request
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 *         updatedBy:
 *           type: string
 *           description: User who last updated the request
 *       example:
 *         id: clfg7skl10000zzz9z9z9z9z9
 *         title: Add dark mode
 *         description: Implement a dark mode theme for the application
 *         requestedBy: John Doe
 *         priority: Medium
 *         status: New
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 *         updatedBy: null
 */

/**
 * @swagger
 * /feature-requests:
 *   post:
 *     summary: Create a new feature request
 *     tags: [Feature Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requestedBy:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High, Critical]
 *     responses:
 *       201:
 *         description: Feature request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureRequest'
 *       400:
 *         description: Invalid input
 */
router.post(
  '/',
  validate([
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('priority')
      .optional()
      .isIn(['Low', 'Medium', 'High', 'Critical'])
      .withMessage('Priority must be Low, Medium, High, or Critical'),
  ]),
  featureRequestController.createFeatureRequest
);

/**
 * @swagger
 * /feature-requests:
 *   get:
 *     summary: Get all feature requests
 *     tags: [Feature Requests]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, status, priority, createdAt]
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [New, Open, InProgress, UnderReview, Completed, Rejected]
 *         description: Filter by status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [Low, Medium, High, Critical]
 *         description: Filter by priority
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of feature requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FeatureRequest'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     itemsPerPage:
 *                       type: integer
 */
router.get(
  '/',
  validate([
    query('sortBy')
      .optional()
      .isIn(['title', 'status', 'priority', 'createdAt'])
      .withMessage('sortBy must be title, status, priority, or createdAt'),
    query('sortOrder')
      .optional()
      .isIn(['asc', 'desc'])
      .withMessage('sortOrder must be asc or desc'),
    query('status')
      .optional()
      .isIn(['New', 'Open', 'InProgress', 'UnderReview', 'Completed', 'Rejected'])
      .withMessage('Invalid status'),
    query('priority')
      .optional()
      .isIn(['Low', 'Medium', 'High', 'Critical'])
      .withMessage('Invalid priority'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
  ]),
  featureRequestController.getAllFeatureRequests
);

/**
 * @swagger
 * /feature-requests/{id}:
 *   get:
 *     summary: Get a feature request by ID
 *     tags: [Feature Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feature request ID
 *     responses:
 *       200:
 *         description: Feature request details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureRequest'
 *       404:
 *         description: Feature request not found
 */
router.get(
  '/:id',
  validate([
    param('id').notEmpty().withMessage('Feature request ID is required')
  ]),
  featureRequestController.getFeatureRequestById
);

/**
 * @swagger
 * /feature-requests/{id}/status:
 *   put:
 *     summary: Update feature request status
 *     tags: [Feature Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feature request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [New, Open, InProgress, UnderReview, Completed, Rejected]
 *     responses:
 *       200:
 *         description: Status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureRequest'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Feature request not found
 */
router.put(
  '/:id/status',
  validate([
    param('id').notEmpty().withMessage('Feature request ID is required'),
    body('status')
      .notEmpty()
      .withMessage('Status is required')
      .isIn(['New', 'Open', 'InProgress', 'UnderReview', 'Completed', 'Rejected'])
      .withMessage('Invalid status'),
  ]),
  featureRequestController.updateFeatureRequestStatus
);

/**
 * @swagger
 * /feature-requests/{id}:
 *   delete:
 *     summary: Delete a feature request
 *     tags: [Feature Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feature request ID
 *     responses:
 *       204:
 *         description: Feature request deleted successfully (no content)
 *       404:
 *         description: Feature request not found
 */
router.delete(
  '/:id',
  validate([
    param('id').notEmpty().withMessage('Feature request ID is required')
  ]),
  featureRequestController.deleteFeatureRequest
);

module.exports = router;