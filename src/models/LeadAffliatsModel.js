const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db_connection');
const {sequelize1,sequelize2} = require('../../config/db_connection');

// Define the Lead model
const LeadAffliatsModel = sequelize2.define('LeadAffliatsModel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Define as primary key if not using default
    autoIncrement: true, // Auto-increment the ID value
    allowNull: false,
  }, 
  reference_id : {
    type: DataTypes.STRING,
    allowNull: null,
  },
  botId : {
    type: DataTypes.INTEGER,
    allowNull: null,
  },
  source_type : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryBrowsed : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  productBrowsed : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ctaJourney : {
    type: DataTypes.STRING,
    allowNull: true,
  }, 
  userId : {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  api_key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  offer_id : {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: null,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: null,
  },
  telephone : {
    type: DataTypes.STRING,
    allowNull: null,
  },
  email_id: {
    type: DataTypes.STRING,
    allowNull: null,
  },
  sub1 : {
    type: DataTypes.STRING,
    allowNull: null,
  },
  sub2 : {
    type: DataTypes.STRING,
    allowNull: null,
  },
  sub3 : {
    type: DataTypes.STRING,
    allowNull: null,
  },
  vendor_json_format: {
    type: DataTypes.JSON,
    allowNull: null,
  },
  json_format: {
    type: DataTypes.TEXT,
    allowNull: null,
  },
  added_date: {
    type: DataTypes.DATEONLY,  // Use DataTypes.DATE for a timestamp
    allowNull: null,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  },
  added_datetime : {
    type: DataTypes.DATE,  // Use DataTypes.DATE for a timestamp
    allowNull: null,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  },
  spreadsheet_id : {
    type: DataTypes.STRING,
    allowNull: null,
  },
}, {
  timestamps: false, // Disable automatic `createdAt`/`updatedAt` fields
  tableName: 'affiliate_whatsapp_lead', // Optional: specify the table name if you want to override the default (pluralized) name
});

// Sync the model with the database
LeadAffliatsModel.sync({ force: false }).then(() => {
});

module.exports = LeadAffliatsModel;
