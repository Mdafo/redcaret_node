/*
 # AUTHOR        : ABDUL RAHMAN KHAN
 # MODULE NAME   : FETCH PRODCUT AND DETAILS WITH CATEGORY AND PRODUCT MEDIA URL
 # USED TABLE    : BOLT_PRODUCT,DHC_CATEGORY,BOLT_WHATSAPP_SEND_MEDIA_URL
 # PROJECT NAME  : NIRVASA WHATSAPP SHOP
 # DATE          : 07-APRIL-2025
*/
const ProductModel = require('../models/ProductModel');
const joinModel = require('../models/');
const Category = require('../models/CategoryModel');
const BoltWhatsapSendMediaModel = require('../models/BoltWhatsapSendMediaModel');
const { Op } = require('sequelize'); // Sequelize operators for more complex queries

// Fetch Products by Category ID

const FetchProductsByCategoryId = async (categoryId) => {
  try {
    return await ProductModel.findAll({
      where: {
        category_id: categoryId,
        status_id: 1,
      },
      order: [['bolt_product_id', 'DESC']],
      attributes: ['bolt_product_id','mrp', 'name'], // Select fields from ProductModel
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['category_name', 'short_code'], // Fields from dhc_category
          required: false, // LEFT JOIN
        },
        {
          model: BoltWhatsapSendMediaModel,
          as: 'media',
          attributes: ['product_id','video_url','image_url_1', 'image_url_2'], // Fields from bolt_whatsapp_send_media_url
          required: false, // LEFT JOIN
          where: {
            status: 1, // only include active media
          },
        }
      ],

    });
  } catch (err) {
    throw new Error(`Error fetching products for categoryId ${categoryId}: ${err.message}`);
  }
};



// Fetch Product Ingredients
const FetchProductIngredients = async (productId) => {
  try {
    return await ProductModel.findAll({
      where: {
        bolt_product_id: productId,
        status_id: 1,
      },
      attributes: ['bolt_product_id','mrp', 'ingredient'],
      order: [['bolt_product_id', 'DESC']],
      limit:1,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['category_name', 'short_code'], // Fields from dhc_category
          required: false, // LEFT JOIN
        },
        {
          model: BoltWhatsapSendMediaModel,
          as: 'media',
          attributes: ['product_id','video_url','image_url_1', 'image_url_2'], // Fields from bolt_whatsapp_send_media_url
          required: false, // LEFT JOIN
          where: {
            status: 1, // only include active media
          },
        }
      ],
    });
  } catch (err) {
    throw new Error(`Error fetching ingredients for productId ${productId}: ${err.message}`);
  }
};

// Fetch Product Usage Instructions
const FetchHowToUseProduct = async (productId) => {
  try {
    return await ProductModel.findAll({
      where: {
        bolt_product_id: productId,
        status_id: 1,
        
      },
      attributes: ['bolt_product_id','mrp', 'how_to_use'],
      order: [['bolt_product_id', 'DESC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['category_name', 'short_code'], // Fields from dhc_category
          required: false, // LEFT JOIN
        },
        {
          model: BoltWhatsapSendMediaModel,
          as: 'media',
          attributes: ['product_id','video_url','image_url_1', 'image_url_2'], // Fields from bolt_whatsapp_send_media_url
          required: false, // LEFT JOIN
          where: {
            status: 1, // only include active media
          },
        }
      ],
    });
  } catch (err) {
    throw new Error(`Error fetching how to use products for productId ${productId}: ${err.message}`);
  }
};

// Fetch Product Benefits
const FetchProductBenefits = async (productId) => {
  try {
    return await ProductModel.findAll({
      where: {
        bolt_product_id: productId,
        status_id: 1,
      },
      attributes: ['bolt_product_id','mrp', 'product_dec'],
      order: [['bolt_product_id', 'DESC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['category_name', 'short_code'], // Fields from dhc_category
          required: false, // LEFT JOIN
        },
        {
          model: BoltWhatsapSendMediaModel,
          as: 'media',
          attributes: ['product_id','video_url','image_url_1', 'image_url_2','image_url_3'], // Fields from bolt_whatsapp_send_media_url
          required: false, // LEFT JOIN
          where: {
            status: 1, // only include active media
          },
        }
      ],
    });
  } catch (err) {
    throw new Error(`Error fetching benefits for productId ${productId}: ${err.message}`);
  }
};

// Fetch Product Price
const FetchProductPrice = async (productId) => {
  try {
    return await ProductModel.findAll({
      where: {
        bolt_product_id: productId,
        status_id: 1,
      },
      attributes: ['bolt_product_id','product_short_dec'],
      order: [['bolt_product_id', 'DESC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['category_name', 'short_code'], // Fields from dhc_category
          required: false, // LEFT JOIN
        },
       
      ],
    });
  } catch (err) {
    throw new Error(`Error fetching product price for this productId ${productId}: ${err.message}`);
  }
};

module.exports = {
  FetchProductsByCategoryId,
  FetchProductIngredients,
  FetchHowToUseProduct,
  FetchProductBenefits,
  FetchProductPrice,
};
