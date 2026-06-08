const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db_connection');
const {sequelize1,sequelize2} = require('../../config/db_connection');

// Define the Category model
const CustomerModel = sequelize1.define('CustomerModel', {
  bot_customer_id : {
    type: DataTypes.INTEGER,
    primaryKey: true, // Define as primary key if not using default
    autoIncrement: true, // Auto-increment the ID value
    allowNull: false,
  },
  Account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customer_id : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
 
  first_name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dstPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telephone : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alt_phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  query_for: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lead_id : {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  date_created: {
    type: DataTypes.DATE,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  },
 
}, {
  timestamps: false,
  // Optionally add other options for timestamps or table names
  tableName: 'bolt_customer',  // Optional: specify the table name if you want to override the default (pluralized) name
});

// Sync the model with the database
CustomerModel.sync({ force: false }).then(() => {
});

module.exports = CustomerModel;
