// services/getCredentialGoogleSheetService.js

// Import the Sequelize connection from the configuration
const { sequelize1 } = require('../../config/db_connection'); 

// Import the logger for error tracking
const logger = require('../utils/logger'); 

/**
 * Fetches the latest valid Google Sheet credential from the database.
 * 
 * This function queries the `googleSheetReaderDemoCredential` table for the most recent
 * entry where `file_status` is set to 1, indicating a valid credential.
 *
 * @returns {Object|null} The credential object (file_name) if found, otherwise null.
 * 
 * @throws {Error} Throws an error if the database query fails.
 */
const FetchGoogleSheetCredential = async () => {
  try {
    // Query the database to fetch the latest valid credential's file_name
    const [results, metadata] = await sequelize1.query(
      'SELECT file_name FROM googleSheetReaderDemoCredential WHERE file_status = 1 ORDER BY id DESC LIMIT 1'
    );

    // Check if the results are empty or undefined
    if (!results || results.length === 0) {
      return null;  // No valid credentials found
    }

    // Return the first result, which is the latest valid credential
    return results[0]; 
  } catch (error) {
    // Log the error if the database query fails
    logger.error('googleSheetCredential/error', `Error fetching credentials: ${error.message}`);
    
    // Rethrow the error to be handled by the calling function
    throw new Error('Failed to fetch Google Sheets credential');
  }
};

// Export the function to be used in other parts of the application
module.exports = { FetchGoogleSheetCredential };