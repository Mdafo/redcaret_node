/*
 # AUTHOR        : ABDUL RAHMAN KHAN
 # MODULE NAME   : CREATE LEAD 
 # USED TABLE    : BOLT_LEAD,BOLT_CUSTOMER
 # PROJECT NAME  : NIRVASA WHATSAPP SHOP
 # DATE          : 07-APRIL-2025 
*/

const LeadModel = require('../models/LeadModel');
const logger = require('../utils/logger');

// Service function to create or update a lead
const CreateOrUpdateLead = async (telephone, leadData, customerId) => {
  let leadId = '';
  let lead = await LeadModel.findOne({
    where: { telephone },
    order: [['id', 'DESC']],
    limit: 1,
  });

  if (lead) {
    leadId = lead.id;
    // Lead already exists, no need to create a new one, just update it if needed
    await lead.update({
      Account_id: customerId,  // Update Account_id in the lead
      customer_id: customerId, // Update customer_id in the lead
    });
    logger.success('Lead', `Lead updated with telephone ${telephone}`);
  } else {
    // Create new lead if none exists
    lead = await LeadModel.create({
      telephone,
      ...leadData,
    });
    leadId = lead.id;
    logger.success('Lead', `New lead created with telephone ${telephone}`);
  }

  return { leadId, lead };
};

module.exports = { CreateOrUpdateLead };
