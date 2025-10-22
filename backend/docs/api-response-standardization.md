# API Response Standardization

## Overview

This document outlines the standardization of API responses implemented in the Feature Tracking System API. The standardization ensures that all API endpoints return responses in a consistent format, making it easier for clients to consume the API.

## Response Format

### Success Responses

All successful responses follow this structure:

```json
{
  "success": true,
  "message": "A descriptive message about the operation",
  "data": { ... },
  "statusCode": 200
}
```

- `success`: Boolean flag indicating the request was successful
- `message`: A human-readable message describing the result
- `data`: The actual data returned by the endpoint
- `statusCode`: The HTTP status code

### Error Responses

All error responses follow this structure:

```json
{
  "success": false,
  "message": "A descriptive error message",
  "code": "ERROR_CODE",
  "statusCode": 400,
  "details": [ ... ] // Optional, for validation errors or additional context
}
```

- `success`: Boolean flag indicating the request failed
- `message`: A human-readable error message
- `code`: A machine-readable error code for programmatic handling
- `statusCode`: The HTTP status code
- `details`: Optional field with additional error details

## Implementation

The standardization was implemented using a utility module that provides functions for formatting responses:

- `formatSuccess(data, message, statusCode)`: For formatting successful responses
- `formatError(message, code, statusCode, details)`: For formatting error responses

These functions are used consistently across all controllers and middleware to ensure uniform response structure.

## HTTP Status Codes

The API uses standard HTTP status codes:

- `200 OK`: Successful request
- `201 Created`: Resource successfully created
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

## Examples

### Successful Creation

```json
{
  "success": true,
  "message": "Feature request created successfully",
  "data": {
    "id": "clfg7skl10000zzz9z9z9z9z9",
    "title": "Add dark mode",
    "description": "Implement a dark mode theme for the application",
    "priority": "Medium",
    "status": "New",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "statusCode": 201
}
```

### Validation Error

```json
{
  "success": false,
  "message": "Validation error",
  "code": "VALIDATION_ERROR",
  "statusCode": 400,
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

### Resource Not Found

```json
{
  "success": false,
  "message": "Feature request with ID abc123 not found",
  "code": "FEATURE_REQUEST_NOT_FOUND",
  "statusCode": 404
}