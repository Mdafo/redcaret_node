/*
 # AUTHOR        : ABDUL RAHMAN KHAN
 # MODULE NAME   : CREATE ORDER,Address Save 
 # PROJECT NAME  : REDCARAT JAWLERY
 # DATE          : 20-APRIL-2026
*/

const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");
const { sequelize1 } = require("../../config/db_connection");


// Define and export the CreateOrderAPI function with middleware
exports.CreateOrderAPI = [

  async (req, res) => {
    const orderInputJson = req.body;

    try {
      // Call the CreateOrder service with the input data
      const result = await CreateOrder(orderInputJson);
      // Log and return successful response
      logger.success('Order/success', `Order created: ${JSON.stringify(result)}`);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      // Log and return error response
      logger.error('Order/error', `Something went wrong with phone: ${err.message}`);
      sendResponse(res, 500, false, err.message);
    }
  }
];

exports.placeOrderqq = async (req, res) => {

  try {

    const {
      country,
      firstName,
      lastName,
      address,
      state,
      city,
      zip,
      email,
      houseNo,
      landmark,
      phone,
      password,
      shippingAddress,
      createAccount,
      shipDifferent,
      cartItems
    } = req.body;

   

    // =========================
    // VALIDATION
    // =========================

    if (!country) {
      return sendResponse(
        res,
        400,
        false,
        "Country is required"
      );
    }

    if (!firstName) {
      return sendResponse(
        res,
        400,
        false,
        "First name is required"
      );
    }

    if (!lastName) {
      return sendResponse(
        res,
        400,
        false,
        "Last name is required"
      );
    }

    if (!address) {
      return sendResponse(
        res,
        400,
        false,
        "Address is required"
      );
    }

    if (!state) {
      return sendResponse(
        res,
        400,
        false,
        "State is required"
      );
    }

    if (!city) {
      return sendResponse(
        res,
        400,
        false,
        "City is required"
      );
    }

    if (!zip) {
      return sendResponse(
        res,
        400,
        false,
        "Zip code is required"
      );
    }

    if (!email) {
      return sendResponse(
        res,
        400,
        false,
        "Email is required"
      );
    }

    // Email validation
    const emailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      return sendResponse(
        res,
        400,
        false,
        "Invalid email address"
      );
    }

    if (!houseNo) {
      return sendResponse(
        res,
        400,
        false,
        "House number is required"
      );
    }

    if (!landmark) {
      return sendResponse(
        res,
        400,
        false,
        "Landmark is required"
      );
    }

    if (!phone) {
      return sendResponse(
        res,
        400,
        false,
        "Phone number is required"
      );
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      return sendResponse(
        res,
        400,
        false,
        "Enter valid 10 digit phone number"
      );
    }

    // Password validation
    if (createAccount && !password) {
      return sendResponse(
        res,
        400,
        false,
        "Password is required"
      );
    }

    // Shipping validation
    if (shipDifferent && !shippingAddress) {
      return sendResponse(
        res,
        400,
        false,
        "Shipping address is required"
      );
    }

    // =========================
    // ✅ FIXED HERE ONLY
    // =========================

    const cartItemss = cartItems;

    // =========================
    // INSERT ORDER
    // =========================

    const orderResult = await sequelize1.query(
      `
      INSERT INTO db_billing_address (
        first_name,
        last_name,
        telephone,
        land_mark,
        house_no,
        full_address,
        pincode,
        city_id,
        state_id,
        country_id,
        status,
        customer_id,
        address_type
      )
      VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      {
        replacements: [
            firstName,
            lastName,
            phone,
            landmark,
            houseNo,
            address,
            zip,
            state,
            city,
            country,
            1,
            1,
            1

        ],

        type: sequelize1.QueryTypes.INSERT,
      }
      // first_name,
      //   last_name,
      //   telephone,
      //   land_mark,
      //   house_no,
      //   full_address,
      //   pincode,
      //   city_id,
      //   state_id,
      //   country_id,
      //   added_date,
      //   status,
      //   customer_id,
      //   phone,
      //   password,
      //   address_type
    );

    // =========================
    // GET ORDER ID
    // =========================

    const orderId = orderResult[0];

    // =========================
    // INSERT ORDER ITEMS
    // =========================

    // for (const item of cartItemss) {

    //   if (!item.product_id) {
    //     continue;
    //   }

    //   await sequelize1.query(
    //     `
    //     INSERT INTO order_items (
    //       order_id,
    //       product_id,
    //       product_name,
    //       quantity,
    //       price
    //     )
    //     VALUES (?, ?, ?, ?, ?)
    //     `,
    //     {
    //       replacements: [
    //         1111,
    //         item.product_id,
    //         item.product_name,
    //         item.quantity,
    //         item.price
    //       ],

    //       type: sequelize1.QueryTypes.INSERT,
    //     }
    //   );
    // }

    // =========================
    // SUCCESS RESPONSE
    // =========================

    sendResponse(
      res,
      201,
      true,
      "Order placed successfully"
    );

  } catch (err) {

    console.log(err);

    sendResponse(
      res,
      500,
      false,
      err.message
    );
  }
};
exports.fetchRecommendedProduct = async (req, res) => {

  try {

    const { categoryIds } = req.body;

    // Validation
    if (!Array.isArray(categoryIds) || !categoryIds.length) {

      return sendResponse(
        res,
        400,
        false,
        'Category IDs are required'
      );
    }

    // Fetch random products from categories
    const products = await sequelize1.query(
      `
      SELECT *
      FROM products
      WHERE category_id IN (:categoryIds)
      ORDER BY RAND()
      LIMIT 10
      `,
      {
        replacements: { categoryIds },
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    sendResponse(
      res,
      200,
      true,
      'Recommended products fetched successfully',
      { products }
    );

  } catch (err) {

    console.log(err);

    sendResponse(
      res,
      500,
      false,
      err.message
    );
  }
};
exports.placeOrder = async (req, res) => {
  const transaction = await sequelize1.transaction();

  try {
    const {
      country,
      firstName,
      lastName,
      address,
      state,
      city,
      zip,
      email,
      houseNo,
      landmark,
      phone,
      password,
      shippingAddress,
      createAccount,
      shipDifferent,
      cart_details,
      customer,
      payment_type = "COD",
      order_notes = ""
    } = req.body;

    const customerObj = JSON.parse(customer);
    const customer_id = customerObj.id;
    // =========================
    // VALIDATION
    // =========================

    if (!country) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "Country is required");
    }

    if (!firstName) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "First name is required");
    }

    if (!lastName) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "Last name is required");
    }

    if (!address) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "Address is required");
    }

    if (!state) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "State is required");
    }

    if (!city) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "City is required");
    }

    if (!zip) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "Zip code is required");
    }

    if (!email) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "Email is required");
    }

    const emailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "Invalid email address");
    }

    if (!houseNo) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "House number is required");
    }

    if (!landmark) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "Landmark is required");
    }

    if (!phone) {
      await transaction.rollback();
      return sendResponse(res, 400, false, "Phone number is required");
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      await transaction.rollback();
      return sendResponse(
        res,
        400,
        false,
        "Enter valid 10 digit phone number"
      );
    }

    if (createAccount && !password) {
      await transaction.rollback();
      return sendResponse(
        res,
        400,
        false,
        "Password is required"
      );
    }

    if (shipDifferent && !shippingAddress) {
      await transaction.rollback();
      return sendResponse(
        res,
        400,
        false,
        "Shipping address is required"
      );
    }
console.log(cart_details,'cart_detailscart_details');
    if (!Array.isArray(cart_details) || cart_details.length === 0) {
      await transaction.rollback();
      return sendResponse(
        res,
        400,
        false,
        "Cart items are required"
      );
    }

    // =========================
    // CALCULATE ORDER TOTAL
    // =========================

    const orderAmount = cart_details.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );

    // =========================
    // INSERT BILLING ADDRESS
    // =========================

    const [addressResult] = await sequelize1.query(
      `
      INSERT INTO db_billing_address (
        first_name,
        last_name,
        telephone,
        land_mark,
        house_no,
        full_address,
        pincode,
        city_id,
        state_id,
        country_id,
        status,
        customer_id,
        address_type
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      {
        replacements: [
          firstName,
          lastName,
          phone,
          landmark,
          houseNo,
          address,
          zip,
          city,
          state,
          country,
          1,
          customer_id,
          1
        ],
        type: sequelize1.QueryTypes.INSERT,
        transaction
      }
    );

    const addressId = addressResult;

    // =========================
    // CREATE ORDER
    // =========================

    const [orderResult] = await sequelize1.query(
      `
      INSERT INTO orders (
        customer_id,
        order_id,
        billing_address_id,
        shipping_address_id,
        order_amount,
        order_notes,
        status,
        payment_type
      )
      VALUES (?, ?, ?,?, ?, ?, ?, ?)
      `,
      {
        replacements: [
          customer_id,
          "",
          addressId,
          addressId,
          orderAmount,
          order_notes,
          "Pending",
          payment_type
        ],
        type: sequelize1.QueryTypes.INSERT,
        transaction
      }
    );

    const orderPrimaryId = orderResult;

    // =========================
    // GENERATE ORDER NUMBER
    // Example:
    // ORD000001
    // ORD12000025
    // ORD000125
    // =========================

    const random4Digit = Math.floor(1000 + Math.random() * 9000);

    const generatedOrderId = `ORD${random4Digit}${String(
      orderPrimaryId
    ).padStart(6, "0")}`;

   // console.log(generatedOrderId);
    // =========================
    // UPDATE ORDER NUMBER
    // =========================

    await sequelize1.query(
      `
      UPDATE orders
      SET order_id = ?
      WHERE id = ?
      `,
      {
        replacements: [
          generatedOrderId,
          orderPrimaryId
        ],
        type: sequelize1.QueryTypes.UPDATE,
        transaction
      }
    );

    // =========================
    // UPDATE ORDER NUMBER
    // =========================

    await sequelize1.query(
      `UPDATE db_billing_address
      SET order_id = ?
      WHERE id = ?
      `,
      {
        replacements: [
          generatedOrderId,
          addressId
        ],
        type: sequelize1.QueryTypes.UPDATE,
        transaction
      }
    );

    // =========================
    // INSERT ORDER PRODUCTS
    // =========================


    for (const item of cart_details) {

  // console.log(`
  //   INSERT INTO order_product (
  //     order_id,
  //     product_id,
  //     customer_id,
  //     product_name,
  //     quantity,
  //     price
  //   )
  //   VALUES (
  //     '${generatedOrderId || 0}',
  //     '${item.product_id}',
  //     '${customer_id}',
  //     '${item.product_name}',
  //     '${item.quantity}',
  //     '${item.price}'
  //   )
  // `);

  await sequelize1.query(
    `
    INSERT INTO orders_product (
      order_id,
      product_id,
      customer_id,
      product_name,
      quantity,
      price
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    {
      replacements: [
        generatedOrderId || 0,
        item.product,
        customer_id,
        item.name,
        item.quantity,
        item.price
      ],
      type: sequelize1.QueryTypes.INSERT,
      transaction
    }
  );
}

    // =========================
    // COMMIT
    // =========================

    await transaction.commit();

    return sendResponse(
      res,
      201,
      true,
      "Your order has been placed successfully!",
      {
        order_primary_id: orderPrimaryId,
        order_id: generatedOrderId,
        address_id: addressId,
        order_amount: orderAmount
      }
    );
  } catch (err) {
    await transaction.rollback();

    // console.log(err);

    return sendResponse(
      res,
      500,
      false,
      err.message
    );
  }
};

exports.fetchOrders = async (req, res) => {
  try {
    const { customer_id } = req.body;

    if (!customer_id) {
      return res.status(400).json({
        success: false,
        message: 'customer_id is required'
      });
    }

    const orders = await sequelize1.query(
      'SELECT o.*,p.product_name FROM orders as o left join orders_product as p on p.order_id=o.order_id WHERE o.customer_id = ?',
      {
        replacements: [customer_id],
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.fetchAddress = async (req, res) => {
  try {
    const { customer_id } = req.body;

    if (!customer_id) {
      return res.status(400).json({
        success: false,
        message: 'customer_id is required'
      });
    }

    const orders = await sequelize1.query(
      'SELECT * FROM db_billing_address WHERE customer_id = ?',
      {
        replacements: [customer_id],
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};