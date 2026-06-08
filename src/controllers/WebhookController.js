/*
 # AUTHOR       : ABDUL RAHMAN KHAN
 # MODULE NAME  : Webhook Controller
 # USED TABLE   : DHC_CATEGORY
 # PROJECT NAME : NIRVASA WHATSAPP SHOP
 # DATE         : 04-APRIL-2025 
*/

const Category = require('../models/CategoryModel')//category model
const sendResponse = require('../utils/response');//helper
const logger = require('../utils/logger');// log for error or success response
const authenticateApiKey = require('../utils/authenticate'); // API authenticate middleware

// Fetch all categories
exports.FetchProductCategoriesAPI = [
  authenticateApiKey, // Use the authentication middleware
  async (req, res) => {
    try {
      const categories = await Category.findAll({
        where: { is_active: 1 }, // Only fetch active categories
      });

      if (!categories.length) {
        logger.error('Category', 'Categories not found');
        return sendResponse(res, 404, false, 'Category not found');
      }

      logger.success('Category', `Fetched ${categories.length} categories successfully`);
      sendResponse(res, 200, true, 'Fetch category data successfully', categories);
    } catch (err) {
      logger.error('Category', `Error fetching categories: ${err.message}`);
      sendResponse(res, 500, false, err.message);
    }
  },
];
