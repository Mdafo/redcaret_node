const { PUSH_GOOGLE_SHEET_LEAD_SCHEDULE_URL } = require('../../config/common_config');
const { startWebhookScheduler } = require('../utils/schdeuler'); 
const logger = require('../utils/logger'); // log for error or success response

/**
 * Function to push Google Sheet lead data for multiple URLs
 */
async function pushWhatsappCreatedOrder() {
  // Check if PUSH_GOOGLE_SHEET_LEAD_SCHEDULE_URL is an array
  const urls = Array.isArray(PUSH_GOOGLE_SHEET_LEAD_SCHEDULE_URL) ? PUSH_GOOGLE_SHEET_LEAD_SCHEDULE_URL : [PUSH_GOOGLE_SHEET_LEAD_SCHEDULE_URL];
// console.log(urls,'urll');
  // Define the schedule (e.g., every minute) and request type
  const schedule_on = '*/1 * * * *'; // Every 1 minute
  const PUSH_TYPE = 'GET';

  // Loop through each URL and start a scheduler
  for (let url of urls) {
    try {
      // Start the webhook scheduler for the current URL
      await startWebhookScheduler(url, schedule_on, PUSH_TYPE);
      // console.log(`Order push scheduler started for URL: ${url}`);

      // Log success
      logger.success(
        'scheduler/order/success',
        `Order push scheduler started at ${new Date().toISOString()} with schedule "${schedule_on}" and URL: ${url}`
      );
    } catch (error) {
      // Handle error for individual URLs
      // console.error(`Failed to start order scheduler for URL ${url}:`, error.message);
      logger.error(
        'scheduler/order/error',
        `"${error.message}"  Failed to start order scheduler for URL: ${url} at ${new Date().toISOString()}`
      );
    }
  }
}

module.exports = { pushWhatsappCreatedOrder };