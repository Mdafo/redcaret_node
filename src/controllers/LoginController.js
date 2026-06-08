// /*
//  # AUTHOR       : ABDUL RAHMAN KHAN
//  # MODULE NAME  : Login page API
//  # USED TABLE   : CUSTOMERs
//  # PROJECT NAME : Redcaret
//  # DATE         : 11-MAY-2026 
// */

// const sendResponse = require('../utils/response');
// const logger = require('../utils/logger');
// const {sequelize1} = require('../../config/db_connection');
// const jwt = require("jsonwebtoken");


// exports.customerLogin = async (req, res) => {
//   try {
//     const { telephone } = req.body;

//     if (!telephone) {
//       return sendResponse(res, 400, false, "Mobile required");
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000);

//     const user = await sequelize1.query(
//       "SELECT * FROM customers WHERE telephone = ?",
//       {
//         replacements: [telephone],
//         type: sequelize1.QueryTypes.SELECT,
//       }
//     );

//     if (user.length > 0) {
//       await sequelize1.query(
//         "UPDATE customers SET otp = ? WHERE telephone = ?",
//         {
//           replacements: [otp, telephone],
//           type: sequelize1.QueryTypes.UPDATE,
//         }
//       );
//     } else {
//       await sequelize1.query(
//         "INSERT INTO customers (telephone, otp, created_at) VALUES (?, ?, NOW())",
//         {
//           replacements: [telephone, otp],
//           type: sequelize1.QueryTypes.INSERT,
//         }
//       );
//     }

//     console.log("OTP:", otp); // 👉 replace with SMS API later

//     return sendResponse(res, 200, true, "OTP sent", { telephone });

//   } catch (err) {
//     return sendResponse(res, 500, false, err.message);
//   }
// };
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { telephone, otp } = req.body;

//     const user = await sequelize1.query(
//       "SELECT * FROM customers WHERE telephone = ? AND otp = ?",
//       {
//         replacements: [telephone, otp],
//         type: sequelize1.QueryTypes.SELECT,
//       }
//     );

//     if (user.length === 0) {
//       return sendResponse(res, 400, false, "Invalid OTP");
//     }

//     const customer = user[0];

//     // 🔥 Create JWT token
//     const token = jwt.sign(
//       {
//         id: customer.id,
//         telephone: customer.telephone,
//       },
//       "SECRET_KEY_123",
//       { expiresIn: "7d" }
//     );
    
//     var otp_verify_date = new Date();
//     await sequelize1.query(
//       "UPDATE customers SET otp_verified = 1, otp_verify_date = ? WHERE id = ?",
//       {
//         replacements: [otp_verify_date, customer.id],
//         type: sequelize1.QueryTypes.UPDATE,
//       }
//     );

//     return sendResponse(res, 200, true, "Login successful", {
//       customer,
//       token,
//     });

//   } catch (err) {
//     return sendResponse(res, 500, false, err.message);
//   }
// };


/*
 # AUTHOR       : ABDUL RAHMAN KHAN
 # MODULE NAME  : Login page API
 # USED TABLE   : customers
 # PROJECT NAME : Redcaret
*/

const sendResponse = require("../utils/response");
const logger = require("../utils/logger");
const { sequelize1 } = require("../../config/db_connection");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/mailer");
const bcrypt = require("bcrypt");
const sendMail = require('../utils/mailer');


exports.customerLogin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier) {
      return sendResponse(
        res,
        400,
        false,
        "Please enter email or mobile number"
      );
    }

    if (!password) {
      return sendResponse(
        res,
        400,
        false,
        "Please enter password"
      );
    }

    let customer;

    const mobileRegex = /^[6-9]\d{9}$/;

    if (mobileRegex.test(identifier)) {
      customer = await sequelize1.query(
        "SELECT * FROM customers WHERE telephone = ?",
        {
          replacements: [identifier],
          type: sequelize1.QueryTypes.SELECT,
        }
      );
    } else {
      customer = await sequelize1.query(
        "SELECT * FROM customers WHERE email = ?",
        {
          replacements: [identifier],
          type: sequelize1.QueryTypes.SELECT,
        }
      );
    }

    if (!customer.length) {
      return sendResponse(
        res,
        404,
        false,
        "Customer not found"
      );
    }

    const user = customer[0];
// console.log(user.password);
// console.log(password);
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return sendResponse(
        res,
        401,
        false,
        "Invalid password"
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return sendResponse(
      res,
      200,
      true,
      "Login successful",
      {
        customer: user,
        token,
      }
    );
  } catch (err) {
    console.error(err);
    return sendResponse(
      res,
      500,
      false,
      "Internal server error"
    );
  }
};
exports.verifyOtp = async (req, res) => {
  try {
    const { telephone, otp } = req.body;

    if (!telephone || !otp) {
      return sendResponse(
        res,
        400,
        false,
        "Email and OTP are required"
      );
    }

    const user = await sequelize1.query(
      "SELECT * FROM customers WHERE email = ? AND otp = ?",
      {
        replacements: [telephone, otp],
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      return sendResponse(res, 400, false, "Invalid OTP");
    }

    await sequelize1.query(
        `UPDATE customers 
        SET otp_verifiy = 1,
            otp_verify_date = ?,
            otp = NULL
        WHERE id = ?`,
        {
          replacements: [otp_verify_date, customer.id],
          type: sequelize1.QueryTypes.UPDATE,
        }
      );
   
    const customer = user[0];

    const token = jwt.sign(
      {
        id: customer.id,
        telephone: customer.telephone,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const otp_verify_date = new Date();

    await sequelize1.query(
      `UPDATE customers 
       SET otp_verified = 1,
           otp_verify_date = ?,
           otp = NULL
       WHERE id = ?`,
      {
        replacements: [otp_verify_date, customer.id],
        type: sequelize1.QueryTypes.UPDATE,
      }
    );

    return sendResponse(res, 200, true, "Login successful", {
      customer,
      token,
    });
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, err.message);
  }
};


exports.registerCustomer = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      telephone,
      password,
    } = req.body;

    // 1. Validation
    if (
      !first_name ||
      !last_name ||
      !email ||
      !telephone ||
      !password
    ) {
      return sendResponse(
        res,
        400,
        false,
        "All fields are required"
      );
    }

    // 2. Check duplicate email or phone
    const existingUser = await sequelize1.query(
      `SELECT id FROM customers WHERE email = ? OR telephone = ?`,
      {
        replacements: [email, telephone],
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    if (existingUser.length > 0) {
      return sendResponse(
        res,
        400,
        false,
        "Email or phone already exists"
      );
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);

    // 4. INSERT INTO TABLE
    const result = await sequelize1.query(
      `INSERT INTO customers 
      (first_name, last_name, email, telephone, password,otp,new_password, created_at)
      VALUES (?, ?, ?, ?, ?,?,NOW(),?)`,
      {
        replacements: [
          first_name,
          last_name,
          email,
          telephone,
          hashedPassword,
          otp,
          password,
        ],
        type: sequelize1.QueryTypes.INSERT,
      }
    );
    
    // result contains insert info (mysql insertId etc.)
    const insertId = result?.[0];

      // Send OTP Email
      await sendMail(
        email,
        'Customer Registration OTP',
        `
          <h2>Welcome ${first_name}</h2>
          <p>Thank you for registering.</p>
          <p>Your OTP is:</p>
          <h1 style="color:blue">${otp}</h1>
          <p>Please use this OTP to verify your account.</p>
        `
      );

    return sendResponse(
      res,
      200,
      true,
      "Please check your email for the OTP verification code.",
      {
        customer_id: insertId,
      }
    );

  } catch (err) {
    return sendResponse(
      res,
      500,
      false,
      err.message
    );
  }
};

exports.forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const customer = await sequelize1.query(
      `SELECT id, first_name FROM customers WHERE email = ?`,
      {
        replacements: [email],
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    if (!customer.length) {
      return sendResponse(
        res,
        404,
        false,
        "Email not found"
      );
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    );

    await sequelize1.query(
      `UPDATE customers
       SET otp = ?
       WHERE email = ?`,
      {
        replacements: [otp, email],
      }
    );

    await sendMail(
      email,
      "Reset Password OTP",
      `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
      `
    );

    return sendResponse(
      res,
      200,
      true,
      "OTP sent successfully"
    );

  } catch (err) {

    return sendResponse(
      res,
      500,
      false,
      err.message
    );

  }
};


exports.resetPassword = async (req, res) => {
  try {

    const {
      email,
      otp,
      password
    } = req.body;

    const customer = await sequelize1.query(
      `SELECT id
       FROM customers
       WHERE email = ?
       AND otp = ?`,
      {
        replacements: [email, otp],
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    if (!customer.length) {
      return sendResponse(
        res,
        400,
        false,
        "Invalid OTP"
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await sequelize1.query(
      `UPDATE customers
       SET password = ?,
           otp = NULL
       WHERE email = ?`,
      {
        replacements: [
          hashedPassword,
          email,
        ],
      }
    );

    return sendResponse(
      res,
      200,
      true,
      "Password updated successfully"
    );

  } catch (err) {

    return sendResponse(
      res,
      500,
      false,
      err.message
    );

  }
};