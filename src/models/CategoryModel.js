const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db_connection');
const {sequelize1,sequelize2} = require('../../config/db_connection');
const ProductModel = require('./ProductModel'); 

// Define the Category model
const CommonShopModel = sequelize1.define('CategoryModel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Define as primary key if not using default
    autoIncrement: true, // Auto-increment the ID value
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
   product_code: {
   type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  availability: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }, 
  category: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
   size: {
   type: DataTypes.STRING,
    allowNull: true,
  },
  primary_images: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
  images_1: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
  images_2: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
  images_3: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
  images_4: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
   description: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
  review: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Set default status (1: active, 0: inactive)
  },
}, {
  timestamps: false,
  // Optionally add other options for timestamps or table names
  tableName: 'product',  // Optional: specify the table name if you want to override the default (pluralized) name
});

// Sync the model with the database
CommonShopModel.sync({ force: false }).then(() => {
  console.log('All model synced');
});

module.exports = CommonShopModel;
