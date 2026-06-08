const { PUSH_LEAD_SCHEDULE_URL } = require('../../config/common_config');
const { startWebhookScheduler } = require('../utils/schdeuler'); 
const logger = require('../utils/logger');// log for error or success response

async function pushLead() {
   const url = PUSH_LEAD_SCHEDULE_URL;
   const schedule_on = '*/5 * * * *'; // every  5 minutes1
   const PUSH_TYPE='GET';
  try {
    await startWebhookScheduler(url, schedule_on,PUSH_TYPE);
    // console.log('Lead push scheduler started');
    logger.success(
      'scheduler/success',
      `Lead push scheduler started at ${new Date().toISOString()} with schedule "${schedule_on}" and URL: ${url}`
    );
  } catch (error) {
    // console.error('Failed to start lead scheduler:', error.message);
    logger.success('scheduler/error', `"${error.message}"  Failed to start lead scheduler ${new Date().toISOString()} `);
  }
}

module.exports = { pushLead };
