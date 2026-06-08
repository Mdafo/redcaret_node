
/*
 # AUTHOR         : ABDUL RAHMAN KHAN
 # MODULE NAME    : CREATE LEAD OR CREATE CUSTOMER
 # USED TABLE     : BOLT_LEAD,BOLT_CUSTOMER
 # PROJECT NAME   : NIRVASA WHATSAPP SHOP
 # DATE           : 07-APRIL-2025 
*/

const CustomerModel = require('../models/CustomerModel');
const { CreateOrUpdateLead } = require('./leadService'); // Import the lead service
const logger = require('../utils/logger');

// Service function to create or update a customer
const CreateOrUpdateCustomer = async (telephone, leadData) => {
  let customerId = '';
  let newCustomer = null;

  // Check if customer exists
  const existingCustomer = await CustomerModel.findOne({
    where: { telephone },
    order: [['bot_customer_id', 'DESC']],
    limit: 1,
  });

  if (!existingCustomer) {
    // Create new customer if none exists
    newCustomer = await CustomerModel.create({
      telephone,
      ...leadData,
    });
    customerId = newCustomer.bot_customer_id;
    logger.success('Customer', `New customer created with telephone ${telephone}`);
  } else {
    // Use existing customer
    newCustomer = existingCustomer;
    customerId = newCustomer.bot_customer_id;
    logger.success('Customer', `Existing customer found with telephone ${telephone}`);
  }

  // Now, update the associated Lead with customer_id and Account_id
  const { leadId, lead } = await CreateOrUpdateLead(telephone, leadData, customerId);

  // Update the customer with Account_id, customer_id, and lead_id
    await newCustomer.update({
      Account_id: customerId,      // Account_id in customer model
      customer_id: customerId,    // customer_id in customer model
      lead_id: leadId,            // lead_id in customer model
    });
    // Update the customer with Account_id, customer_id, and lead_id
    await lead.update({
      Account_id: customerId,      // Account_id in customer model
      customer_id: customerId,    // customer_id in customer model
       // lead_id in customer model
    });

  logger.success('Customer', `Customer updated with lead_id: ${leadId}`);

  return { customerId, newCustomer };
};

module.exports = { CreateOrUpdateCustomer };
