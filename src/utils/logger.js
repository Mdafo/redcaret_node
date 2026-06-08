// utils/logger.js
const fs = require('fs');
const path = require('path');

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Add leading zero for single digit months
  const day = String(now.getDate()).padStart(2, '0'); // Add leading zero for single digit days
  return `${year}-${month}-${day}`;
};

// Define base logs directory
const logDir = path.join(__dirname, '../../logs');

// Function to create log directory structure dynamically
const ensureLogDirectoryExists = () => {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true }); // Create the logs folder if it doesn't exist
  }
};

// Function to ensure the category/module-specific folder exists
const ensureFolderExists = (folderName) => {
  const folderPath = path.join(logDir, folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // Create folder if it doesn't exist
  }
  return folderPath;
};

// Function to write logs to a file
const writeLogToFile = (folderName, logType, message) => {
  
  const timestamp = new Date().toISOString();
  const currentDate = getCurrentDate();
  const folderPath = ensureFolderExists(folderName); // Ensure the folder exists or create it
  const logFileName = `${logType}-${currentDate}.log`; // Dynamic log file name based on log type and current date
  const logFilePath = path.join(folderPath, logFileName);
  const logMessage = `${timestamp} - ${message}\n`;

  // Append log message to the appropriate log file
  fs.appendFileSync(logFilePath, logMessage, 'utf8');
};

// Log to the console and to files (with dynamic log folders based on feature/module)
const log = {
  info: (folderName, message) => {
    ensureLogDirectoryExists(); // Ensure logs directory exists
    console.log(`INFO: ${message}`);
    writeLogToFile(folderName, 'info', `INFO: ${message}`);
  },

  error: (folderName, message) => {
    ensureLogDirectoryExists(); // Ensure logs directory exists
    //console.error(`ERROR: ${message}`);
    writeLogToFile(folderName, 'error', `ERROR: ${message}`);
  },

  success: (folderName, message) => {
    ensureLogDirectoryExists(); // Ensure logs directory exists
    console.log(`SUCCESS: ${message}`);
    writeLogToFile(folderName, 'success', `SUCCESS: ${message}`);
  },
};

module.exports = log;


