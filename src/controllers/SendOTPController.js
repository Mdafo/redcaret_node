/*
 # AUTHOR        : ABDUL RAHMAN KHAN
 # MODULE NAME   : CREATE ORDER 
 # USED TABLE    : affiliate_aws_order, affiliate_whatsapp_lead
 # PROJECT NAME  : NIRVASA PRODUCT WHATSAPP SHOP
 # DATE          : 15-APRIL-2025
 # DESCRIPTION   : ORDER COMES FROM WHATSAPP JOURNEY THEN PROCESSES IN OUR DB
 # USED FILE     : SERVICE AND MODEL
*/
const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");
const { sequelize1 } = require("../../config/db_connection");

exports.sendOtp = async (req, res) => {
  try {
    const { telephone } = req.body;

    if (!telephone) {
      return sendResponse(res, 400, false, "Mobile required");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = await sequelize1.query(
      "SELECT * FROM customers WHERE telephone = ? LIMIT 1",
      {
        replacements: [telephone],
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    if (user.length > 0) {
      await sequelize1.query(
        "UPDATE customers SET otp = ?, otp_verified = 0 WHERE telephone = ?",
        {
          replacements: [otp, telephone],
          type: sequelize1.QueryTypes.UPDATE,
        }
      );
    } else {
      await sequelize1.query(
        "INSERT INTO customers (telephone, otp, otp_verified, created_at) VALUES (?, ?, 0, NOW())",
        {
          replacements: [telephone, otp],
          type: sequelize1.QueryTypes.INSERT,
        }
      );
    }

    // TODO: send OTP via SMS provider
    console.log("OTP:", otp);

    return sendResponse(res, 200, true, "OTP sent successfully", {
      telephone,
    });
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { telephone, otp } = req.body;

    const user = await sequelize1.query(
      "SELECT * FROM customers WHERE telephone = ? AND otp = ? LIMIT 1",
      {
        replacements: [telephone, otp],
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      return sendResponse(res, 400, false, "Invalid OTP");
    }

    const customer = user[0];

    // 🔥 CREATE JWT TOKEN
    const token = jwt.sign(
      {
        id: customer.id,
        telephone: customer.telephone,
      },
      "SECRET_KEY_123",
      { expiresIn: "7d" }
    );

    // Update DB
    await sequelize1.query(
      "UPDATE customers SET otp_verified = 1, token = ? WHERE id = ?",
      {
        replacements: [token, customer.id],
        type: sequelize1.QueryTypes.UPDATE,
      }
    );

    return sendResponse(res, 200, true, "Login successful", {
      customer,
      token,
    });
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};