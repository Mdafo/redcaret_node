// Import required modules
const cron = require('node-cron');
const axios = require('axios');
const logger = require('../utils/logger'); // Centralized logger for capturing success and error logs

/**
 * Starts a webhook scheduler that triggers HTTP requests at defined cron intervals.
 *
 * @param {string} url - The webhook URL to trigger
 * @param {string} schedule_on - Cron-formatted schedule string (e.g., 'X/5 X X X X')
 * @param {string} PUSH_TYPE - Type of HTTP method to use: 'GET' or 'POST'
 **/
function startWebhookScheduler(url, schedule_on, PUSH_TYPE) {
  // Validate cron expression before scheduling
  if (!cron.validate(schedule_on)) {
    const errorMsg = `Invalid cron schedule expression: "${schedule_on}"`;
    console.error(errorMsg);
    logger.error('scheduler/error', `${errorMsg} at ${new Date().toISOString()}`);
    return;
  }

  // Schedule the task using the validated cron expression
  cron.schedule(schedule_on, async () => {
    const triggeredAt = new Date().toISOString();
    const requestData = {
      triggeredAt,
      source: 'Lead Scheduler'
    };

    try {
      let response;

      // Handle GET or POST request types
      if (PUSH_TYPE === 'GET') {
        response = await axios.get(url, { params: requestData });
      } else {
        response = await axios.post(url, requestData);
      }

      // Log success with response status
      logger.success(
        'scheduler/success',
        `Webhook successfully triggered at ${triggeredAt} using ${PUSH_TYPE} to URL: ${url}. Status: ${response.status}`
      );
    } catch (err) {
      // Handle errors such as network issues, server errors, or data absence
      const errorMsg = `Failed to trigger webhook at ${triggeredAt}. URL: ${url}. Error: ${err.message}`;
      console.error(errorMsg);
      logger.error('scheduler/error', errorMsg);
    }
  });

  // Log that the scheduler was started successfully
  logger.success(
    'scheduler/start',
    `Scheduler started for URL: ${url} with cron schedule: "${schedule_on}" and HTTP method: ${PUSH_TYPE}`
  );
}

// Export the function for use in other parts of the application
module.exports = { startWebhookScheduler };