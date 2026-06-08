// Main function to create an order
/*
 # AUTHOR        : ABDUL RAHMAN KHAN
 # MODULE NAME   : CREATE ORDER WITH SERVICES AND MODEL
 # USED TABLE    : affiliate_aws_order,affiliate_whatsapp_lead
 # PROJECT NAME  : NIRVASA PRODUCT WHATSAPP SHOP
 # DATE          : 15-APRIL-2025
*/


// Importing required modules and utilities
const OrderModel = require('../models/OrderModel'); // Order schema/model
const WhatsappAffliatesModel = require('../models/LeadAffliatsModel'); // LeadAffliatsModel schema/model
const logger = require('../utils/logger'); // Custom logger utility
const moment = require('moment'); // For handling date/time formatting

// Helper function to safely split full name into first and last name
const splitName = (fullName) => {
  const parts = fullName?.trim().split(' ') || []; // Split name by space
  const firstName = parts[0] || ''; // First part is first name
  const lastName = parts.slice(1).join(' ') || ''; // Remaining parts form last name
  return { firstName, lastName };
};

const CreateOrder = async (orderJson) => {
  try {
    const {
      userId,
      userPhone,
      userName,
      productSummary,
      shippingInformation,
      paymentStatus,
      address_1,
      pincode,
      city,
      state
    } = orderJson;

    const nowInIST = moment().tz('Asia/Kolkata');
    const currentDateOnly = nowInIST.format('YYYY-MM-DD');
    const currentDateTime = nowInIST.format('YYYY-MM-DD HH:mm:ss');

    // Attempt to find existing lead by userId
    const existingLead = await WhatsappAffliatesModel.findOne({
      where: { userId },
      order: [['id', 'DESC']],
      limit: 1,
    });

    // Extract receiver's name to split
    const { firstName, lastName } = splitName(shippingInformation?.receiverName || userName);

    // Assign values based on lead availability
    const offer_id = existingLead?.offer_id || '0';
    const sub1 = existingLead?.sub1 || '0';
    const sub2 = existingLead?.sub2 || '0';
    const sub3 = existingLead?.sub3 || '0';
    const sub6 = existingLead?.sub6 || '0';

    // JSON format for the DB field
    const generatedJsonFormat = {
      offer_id: offer_id.toString(),
      first_name: (firstName ?? '').toString(),
      telephone: (userPhone ?? '').toString(),
      address: (shippingInformation?.deliveryAddress ?? '').toString(),
      sub1: sub1.toString(),
      sub2: sub2.toString(),
      sub3: sub3.toString(),
      sub6: sub6.toString(),
      address_1: (shippingInformation?.deliveryAddress ?? '').toString(),
      pincode: pincode ?? '',
      city: city ?? '',
      state: state ?? '',
      payment: paymentStatus ?? 'Pending'
    };
    var boltRecivingFlag = 0 ;
    if(!existingLead){
      var boltRecivingFlag = 3 ;
    }
    // Build the full order object
    const orderData = {
      reference_id: existingLead?.reference_id || '', //from this table affiliate_whatsapp_lead
      botId: existingLead?.botId || '',//from this table affiliate_whatsapp_lead
      source_type: 'whatsapp',
      userId,
      api_key: existingLead?.api_key || '',//from this table affiliate_whatsapp_lead
      offer_id,
      first_name: firstName,
      last_name: lastName,
      telephone: userPhone,
      email_id: shippingInformation?.receiverEmail || '',
      pincode: pincode || '',
      address: shippingInformation?.deliveryAddress || '',
      sub1,
      sub2,
      sub3,
      vendor_json_format: JSON.stringify(orderJson),
      json_format: JSON.stringify(generatedJsonFormat),
      added_date: currentDateOnly,
      added_datetime: currentDateTime,
      bolt_receiving_flag: boltRecivingFlag,
      address_1: address_1 || '',
      product_name: productSummary?.productName || '',
      product_quantity: productSummary?.productQuantity,
      discount_applied: productSummary?.discountApplied,
      product_price: productSummary?.totalPrice?.toString() || '',
      payment: paymentStatus || 'Pending',
      city: city || '',
      state: state || '',
      spreadsheet_id: existingLead?.spreadsheet_id || '' //from this table affiliate_whatsapp_lead
    };

    const newOrder = await OrderModel.create(orderData);
    logger.success('Order', `Order created for userId ${userId}, orderId: ${newOrder.id}`);
    return { orderId: newOrder.id, orderData: newOrder };

  } catch (error) {
    logger.error('Order/error', `Order creation failed: ${error.message}`);
    throw new Error(`Order creation failed: ${error.message}`);
  }
};
module.exports = { CreateOrder };