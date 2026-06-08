const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db_connection');
const {sequelize1,sequelize2} = require('../../config/db_connection');

// Define the Category model
const GoogleSheetModel = sequelize1.define('GoogleSheetModel', {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true, // Define as primary key if not using default
    autoIncrement: true, // Auto-increment the ID value
    allowNull: false,
  },
  
  reference_id : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_time : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_time_converted: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ad_id : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ad_name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adset_id : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adset_name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  campaign_id : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  campaign_name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  form_id : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  form_name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_organic : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  platform : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_mobile : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  full_name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_qualified : {
    type: DataTypes.STRING,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
  },
  is_converted : {
    type: DataTypes.STRING,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
  },
  flag : {
    type: DataTypes.STRING,  // Use DataTypes.DATE for a timestamp
    allowNull: true,
  },
  added_date: {
    type: DataTypes.DATEONLY,  // Use DataTypes.DATE for a timestamp
    allowNull: null,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  },
  added_date_time : {
    type: DataTypes.DATE,  // Use DataTypes.DATE for a timestamp
    allowNull: null,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  },
  spreadsheet_id : {
    type: DataTypes.STRING,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
  },
  spreadsheet_url : {
    type: DataTypes.STRING,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
  },
}, {
  timestamps: false,
  // Optionally add other options for timestamps or table names
  tableName: 'google_sheet_lead_data',  // Optional: specify the table name if you want to override the default (pluralized) name
});

// Sync the model with the database
GoogleSheetModel.sync({ force: false }).then(() => {
});

module.exports = GoogleSheetModel;
