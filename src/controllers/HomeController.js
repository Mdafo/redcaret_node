/*
 # AUTHOR       : ABDUL RAHMAN KHAN
 # MODULE NAME  : Index page All API
 # USED TABLE   : BOLT_LEAD,BOLT_CUSTOMER
 # PROJECT NAME : Redcaret
 # DATE         : 07-APRIL-2026 
*/

const sendResponse = require('../utils/response');
const logger = require('../utils/logger');
const {sequelize1} = require('../../config/db_connection');


exports.FetchSlider = [
  async (req, res) => {
 

    try {
  
  
      // 🔹 Fetch sliders from category table (type = 2)
      const sliders = await sequelize1.query(
        'SELECT * FROM categories WHERE type = ?',
        {
          replacements: ['slider'],
          type: sequelize1.QueryTypes.SELECT,
        }
      );

      // 🔹 Send response
      sendResponse(res, 201, true, 'Received Slider successfully', {
        sliders
      });

      logger.success('lead/success', 'Received Slider successfully');

    } catch (err) {
      logger.error('slider/error', `Error handling lead: ${err.message}`);
      sendResponse(res, 500, false, err.message);
    }
  },
];
exports.FetchCategory = [
  async (req, res) => {
 

    try {
  
  
      // 🔹 Fetch sliders from category table (type = 2)
      const categories = await sequelize1.query(
        'SELECT * FROM categories WHERE type = ?',
        {
          replacements: ['category'],
          type: sequelize1.QueryTypes.SELECT,
        }
      );

      // 🔹 Send response
      sendResponse(res, 201, true, 'Received categories successfully', {
        categories
      });

      logger.success('category/success', 'Received categories successfully');

    } catch (err) {
      logger.error('category/error', `Error handling lead: ${err.message}`);
      sendResponse(res, 500, false, err.message);
    }
  },
];
exports.FetchLetestDesign = [
  async (req, res) => {
    try {

      // 🔹 Fetch products with category (LEFT JOIN)
      const products = await sequelize1.query(
        `SELECT 
            p.*, 
            c.name AS category_name
         FROM products p
         LEFT JOIN categories c 
            ON p.category_id = c.id
         ORDER BY p.id DESC`,
        {
          type: sequelize1.QueryTypes.SELECT,
        }
      );

      // 🔹 Send response
      sendResponse(res, 200, true, 'Products fetched successfully', {
        products
      });

      logger.success('product/success', 'Products fetched successfully');

    } catch (err) {
      logger.error('product/error', `Error: ${err.message}`);
      sendResponse(res, 500, false, err.message);
    }
  },
];

exports.FetchShopByType = [
  async (req, res) => {
    try {

      // 🔹 Fetch products with category (LEFT JOIN)
      const shopbytype = await sequelize1.query(
        `SELECT 
            p.*, 
            c.name AS category_name
         FROM product_categories p
         LEFT JOIN categories c 
            ON p.category_id = c.id
         ORDER BY p.id DESC`,
        {
          type: sequelize1.QueryTypes.SELECT,
        }
      );

      // 🔹 Send response
      sendResponse(res, 200, true, 'Shop by type fetched successfully', {
        shopbytype
      });

      logger.success('shopbytype/success', 'Shop by type fetched successfully');

    } catch (err) {
      logger.error('shopbytype/error', `Error: ${err.message}`);
      sendResponse(res, 500, false, err.message);
    }
  },
];
exports.FetchTraditionalJwalelryAndAllProduct = [
  async (req, res) => {
    try {

      // 🔹 Fetch products with category (LEFT JOIN)
      const traditionalJwalelry = await sequelize1.query(
          `SELECT 
              p.*, 
              c.name AS category_name
          FROM products AS p
          LEFT JOIN categories AS c 
              ON p.category_id = c.id
          WHERE p.category_id = :categoryId
          ORDER BY p.id DESC`,
          {
            replacements: { categoryId: 9 },
            type: sequelize1.QueryTypes.SELECT,
          }

      );
       const all_product = await sequelize1.query(
          `SELECT 
              p.*, 
              c.name AS category_name,
              p.old_price as discountPrice,
              p.price
          FROM products AS p
          LEFT JOIN categories AS c 
              ON p.category_id = c.id
          WHERE p.category_id not in(9)
          ORDER BY p.id DESC`,
          {
            type: sequelize1.QueryTypes.SELECT,
          }

      );
      // 🔹 for all traditionalJwalelry & all product
      sendResponse(res, 200, true, 'all traditionalJwalelry and all product fetched successfully', {
        traditionalJwalelry,
        all_product
      });

      logger.success('traditionalJwalelry_allProduct/success', 'all product fetched successfully');

    } catch (err) {
      logger.error('traditionalJwalelry_allProduct/error', `Error: ${err.message}`);
      sendResponse(res, 500, false, err.message);
    }
  },
];

exports.FetchAllProduct = [
  async (req, res) => {
    try {

      // 🔹 Fetch products with category (LEFT JOIN)
      const all_product = await sequelize1.query(
          `SELECT 
              p.*, 
              c.name AS category_name
          FROM products AS p
          LEFT JOIN categories AS c 
              ON p.category_id = c.id
          WHERE p.category_id not in(9)
          ORDER BY p.id DESC`,
          {
            type: sequelize1.QueryTypes.SELECT,
          }

      );

      // 🔹 Send response
      sendResponse(res, 200, true, 'all product fetched successfully', {
        all_product
      });

      logger.success('product/success', 'all product fetched successfully');

    } catch (err) {
      logger.error('product/error', `Error: ${err.message}`);
      sendResponse(res, 500, false, err.message);
    }
  },
];

exports.FetchProductByReels = [
  async (req, res) => {
    try {

      const all_product_reels = await sequelize1.query(
        `SELECT p.* FROM shopbyreels AS p
         WHERE p.status IN (1)
         ORDER BY p.id DESC`,
        {
          type: sequelize1.QueryTypes.SELECT,
        }
      );

      // 🔥 Transform data
      const formattedData = all_product_reels.map(item => {
        let videoPath = null;

        if (item.product_video) {
          try {
            const parsed = JSON.parse(item.product_video);

            if (parsed.length > 0) {
              videoPath = parsed[0].download_link.replace(/\\\\/g, '/');
            }
          } catch (e) {
            videoPath = null;
          }
        }

        return {
          ...item,
          product_video: videoPath
        };
      });

      sendResponse(res, 200, true, 'all product reels fetched successfully', {
        all_product_reels: formattedData
      });

      logger.success('all_product_reels/success', 'all product reels fetched successfully');

    } catch (err) {
      logger.error('all_product_reels/error', `Error: ${err.message}`);
      sendResponse(res, 500, false, err.message);
    }
  },
];

exports.fetchStates = async (req, res) => {
  try {

    const countryId = req.params.id;
   // console.log(countryId,'countryIdcountryId')
    const states = await sequelize1.query(
      'SELECT * FROM states WHERE country_id = ?',
      {
        replacements: [countryId],
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    sendResponse(
      res,
      200,
      true,
      'Received states successfully',
      { states }
    );

  } catch (err) {

    sendResponse(res, 500, false, err.message);

  }
};

exports.fetchCities = async (req, res) => {
  try {

    const stateId = req.params.id;

    const cities = await sequelize1.query(
      'SELECT * FROM cities WHERE state_id = ?',
      {
        replacements: [stateId],
        type: sequelize1.QueryTypes.SELECT,
      }
    );

    sendResponse(
      res,
      200,
      true,
      'Received city successfully',
      { cities }
    );

  } catch (err) {

    sendResponse(res, 500, false, err.message);

  }
};