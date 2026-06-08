
/*
 # AUTHOR         : ABDUL RAHMAN KHAN
 # MODULE NAME    : CREATE LEAD OR CREATE CUSTOMER
 # USED TABLE     : BOLT_LEAD,BOLT_CUSTOMER
 # PROJECT NAME   : NIRVASA WHATSAPP SHOP
 # DATE           : 07-APRIL-2025 
*/
const LeadAffliatsModel = require('../models/LeadAffliatsModel');
const logger = require('../utils/logger');

// Rename function to avoid conflict
const createOrUpdateLead = async (telephone, leadData) => {
  let laedId = '';
  let lead = null;

    lead = await LeadAffliatsModel.create(leadData);
    laedId = lead.id; // Assuming 'id' acts as unique identifier
    logger.success('Lead', `New lead created with telephone ${telephone}`);
    return { laedId, lead };
  


};

module.exports = { createOrUpdateLead };
