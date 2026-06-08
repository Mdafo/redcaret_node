const { DataTypes } = require('sequelize');
const {sequelize1,sequelize2} = require('../../config/db_connection');
const ProductModel = require('./ProductModel'); 

// Define the Category model
const BoltWhatsapSendMediaModel = sequelize1.define('BoltWhatsapSendMediaModel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Define as primary key if not using default
    autoIncrement: true, // Auto-increment the ID value
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER, // Or use ENUM for specific status options like 'active', 'inactive'
    allowNull: true,       // Set default status (1: active, 0: inactive)
  },
  video_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url_1: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
  image_url_2: {
    type: DataTypes.STRING,  // You can also use DataTypes.TEXT if needed
    allowNull: true,         // Assuming the image is optional
  },
  status: {
    type: DataTypes.INTEGER, // Or use ENUM for specific status options like 'active', 'inactive'
    allowNull: true,
  },
  

}, {
  timestamps: false,
  // Optionally add other options for timestamps or table names
  tableName: 'bolt_whatsapp_send_media_url',  // Optional: specify the table name if you want to override the default (pluralized) name
});

// Sync the model with the database
BoltWhatsapSendMediaModel.sync({ force: false }).then(() => {
  console.log('All model synced');
});

module.exports = BoltWhatsapSendMediaModel;
