// models/index.js
const Sequelize = require('sequelize');
const { sequelize1, sequelize2 } = require('../../config/db_connection');

// Import Models
const ProductModel = require('./ProductModel');
const CategoryModel = require('./CategoryModel');
const BoltWhatsapSendMediaModel = require('./BoltWhatsapSendMediaModel');

// // Define Associations
// ProductModel.belongsTo(CategoryModel, { foreignKey: 'category_id', as: 'category' });
// CategoryModel.hasMany(ProductModel, { foreignKey: 'category_id', as: 'products' });

// // JOIN BoltWhatsapSendMediaModel on product_id
// ProductModel.belongsTo(BoltWhatsapSendMediaModel, {
//   foreignKey: 'product_id',
//   targetKey: 'id',
//   as: 'media'
// });

ProductModel.belongsTo(CategoryModel, {
  foreignKey: 'category_id',
  as: 'category',
});


ProductModel.belongsTo(BoltWhatsapSendMediaModel, {
  foreignKey: 'bolt_product_id', // or adjust based on your actual schema
  targetKey: 'product_id',           // the field in media table that links to product
  as: 'media',
});

module.exports = {
  ProductModel,
  CategoryModel,
  BoltWhatsapSendMediaModel,
};
