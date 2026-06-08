const { google } = require('googleapis');
const path = require('path');

// Import the FetchGoogleSheetCredential function from the service
const { FetchGoogleSheetCredential } = require('../services/getCredentialGoogleSheetService');

// Declare `auth` and `sheets` as global variables
let auth;
let sheets;


// Self-invoking async function to fetch credentials and set up authentication
(async () => {
  try {
    // Call the service function to fetch the credential
    const result = await FetchGoogleSheetCredential();

    if (result && result.file_name) {
      const fileName = result.file_name;

      // Construct the path for the key file
      const KEYFILEPATH = path.join(__dirname, `../../config/${fileName}`);
      console.log('File Name:', fileName);
      console.log('Key File Path:', KEYFILEPATH);

      // Define the SCOPES for Google Sheets API
      const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

      // Authentication using GoogleAuth
      auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,  // Using the constructed path here
        scopes: SCOPES,
      });

      // Initialize the Sheets API client
      sheets = google.sheets({ version: 'v4', auth });

      console.log('Authentication and Sheets client setup complete.');
    } else {
      console.log('No valid Google Sheet credential found.');
    }
  } catch (error) {
    //console.error('Error:', error.message);
  }
})();

// Function to get a Sheets client (use the globally available `auth` object)
const getSheetsClient = async () => {
  if (!sheets) {
    throw new Error('Sheets client not initialized. Ensure that the credentials are fetched and authentication is set up.');
  }
  return sheets;
};

// Function to read data from a Google Sheet
const readSheetData = async (spreadsheetId, range) => {
  const sheetsClient = await getSheetsClient();
  // console.log(range,'rangerange');
  //      process.exit(0);
  const response = await sheetsClient.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
   //console.log(response.data.values);
     // process.exit(0);
  return response.data.values;
};

// Function to update values in a Google Sheet
const updateSheetValues = async (spreadsheetId, range, values) => {
  const sheetsClient = await getSheetsClient();
  await sheetsClient.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });
};

module.exports = { readSheetData, updateSheetValues };
