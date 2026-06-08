// utils/response.js (Helper file for consistent response structure)
const sendResponse = (res, statusCode, success, message, data = {}) => {
    res.status(statusCode).json({
      status: success,
      message,
      data,
    });
  };
  
  module.exports = sendResponse;