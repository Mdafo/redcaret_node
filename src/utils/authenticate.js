// utils/authenticate.js
 const APIAuthunticateModel = require('../models/AuthunticateModel');

// Middleware to check the API key in the request headers
const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // Get API key from the request headers

  // If API key is missing
  if (!apiKey) {
    return res.status(403).json({
      status: false,
      message: 'Forbidden: Missing API key',
    });
  }

  try {
    // Query the database for the valid API key
    const validateRequest = await APIAuthunticateModel.findAll({
      where: {
        api_key: apiKey,  // Match by the API key
        is_active: 1,
      },
      order: [['id', 'DESC']], 
      limit: 1,  // Limit to 1 result
    });

    // Check if any record was found
    if (validateRequest.length === 0) {
      // If no user matches the provided API key
      return res.status(403).json({
        status: false,
        message: 'Forbidden: Invalid API key',
      });
    }

    next(); // If the API key is valid, allow the request to proceed
  } catch (error) {

    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });

  }
};

module.exports = authenticateApiKey;
