const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db_connection');
const {sequelize1,sequelize2} = require('../../config/db_connection');

// Define the Category model
const ProductModel = sequelize1.define('ProductModel', {
  bolt_product_id : {
    type: DataTypes.INTEGER,
    primaryKey: true, // Define as primary key if not using default
    autoIncrement: true, // Auto-increment the ID value
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brand_master: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brand_name: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sku : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_type : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alias_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  product_short_dec: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  product_short_dec: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  regular_price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sale_price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  }, 
  ingredient: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
  how_to_use: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
  product_dec	: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
  product_category: {
    type: DataTypes.INTEGER, // Or use ENUM for specific status options like 'active', 'inactive'
    allowNull: 1,
    defaultValue: 1,         // Set default status (1: active, 0: inactive)
  },
  category_id: {
    type: DataTypes.INTEGER, // Or use ENUM for specific status options like 'active', 'inactive'
    allowNull: true,
  },
  status_id : {
    type: DataTypes.INTEGER, // Or use ENUM for specific status options like 'active', 'inactive'
    allowNull: 1,
    defaultValue: 1,         // Set default status (1: active, 0: inactive)
  },
}, {
  timestamps: false,
  // Optionally add other options for timestamps or table names
  tableName: 'bolt_product',  // Optional: specify the table name if you want to override the default (pluralized) name
});

// Sync the model with the database
ProductModel.sync({ force: false }).then(() => {
  // console.log('Product model synced');
});

module.exports = ProductModel;
