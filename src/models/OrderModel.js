/*
 # AUTHOR        : ABDUL RAHMAN KHAN
 # MODULE NAME   : CREATE ORDER WITH SERVICES
 # USED TABLE    : affiliate_aws_order
 # PROJECT NAME  : NIRVASA PRODUCT WHATSAPP SHOP
 # DATE          : 15-APRIL-2025
*/


// Import Sequelize data types
const { DataTypes } = require('sequelize');

// Import the Sequelize instances (for different DBs or connections if needed)
const { sequelize1, sequelize2 } = require('../../config/db_connection');

// Define the OrderModel using sequelize1 connection
const OrderModel = sequelize1.define('OrderModel', {
  // Primary key ID with auto-increment
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  // Order reference ID (can be used for tracking or linking orders)
  reference_id: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // Bot ID associated with the order (useful for chatbot-based orders)
  botId: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // Source of the order (e.g., whatsapp, website, etc.)
  source_type: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // Unique ID of the user placing the order
  userId: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // API key if applicable (optional)
  api_key: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // ID of the offer applied on the order
  offer_id: {
    type: DataTypes.BIGINT,
    allowNull: null,
  },

  // User's first name
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // User's last name
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // User's contact number
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Email ID of the receiver
  email_id: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // Postal code of the delivery address
  pincode: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // Full delivery address
  address: {
    type: DataTypes.TEXT,
    allowNull: null,
  },

  // Custom metadata fields (used for tracking or affiliate info)
  sub1: {
    type: DataTypes.STRING,
    allowNull: null,
  },
  sub2: {
    type: DataTypes.STRING,
    allowNull: null,
  },
  sub3: {
    type: DataTypes.STRING,
    allowNull: null,
  },
  vendor_json_format: {
    type: DataTypes.JSON,
    allowNull: null,
  },
  // JSON string storing additional metadata in structured format
  json_format: {
    type: DataTypes.TEXT,
    allowNull: null,
  },

  // Date the order was added (without time)
  added_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  // Full timestamp when order was added
  added_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  // Flag for whether the order was received by the "bolt" system
  bolt_receiving_flag: {
    type: DataTypes.INTEGER,
    allowNull: null,
  },

  // Address line 1 (duplicate or secondary field for address)
  address_1: {
    type: DataTypes.TEXT,
    allowNull: null,
  },

  // Name of the product ordered
  product_name: {
    type: DataTypes.STRING,
    allowNull: null,
  },
   // product_quantity of the product ordered
  product_quantity	: {
    type: DataTypes.STRING,
    allowNull: null,
  },
 // discount_applied of the product ordered
 discount_applied	: {
  type: DataTypes.STRING,
  allowNull: null,
},
  // Price of the product
  product_price: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // Payment status of the order (e.g., Pending, Paid)
  payment: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // City part of the address
  city: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // State part of the address
  state: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // Date and time when bolt received the order (optional future use)
  bolt_receiving_datetime: {
    type: DataTypes.STRING,
    allowNull: null,
  },	
  // Any message related to bolt order reception
  bolt_receiving_message: {
    type: DataTypes.STRING,
    allowNull: null,
  },

  // Indicates if API is available or applicable (e.g., 0 or 1)
  api_availability: {
    type: DataTypes.INTEGER,
    allowNull: null,
  },
  spreadsheet_id: {
    type: DataTypes.STRING,
    allowNull: null,
  }

}, {
  // Model options
  timestamps: false, // Disable Sequelize's default timestamps (createdAt, updatedAt)
  tableName: 'affiliate_aws_order', // Use a specific table name instead of pluralizing
});

// Sync the model with the DB without dropping existing table/data
OrderModel.sync({ force: false }).then(() => {
  // console.log('OrderModel synced');
});

// Export the model for use in services/controllers
module.exports = OrderModel;
