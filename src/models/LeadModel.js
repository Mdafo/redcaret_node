const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db_connection');
const {sequelize1,sequelize2} = require('../../config/db_connection');

// Define the Lead model
const LeadModel = sequelize1.define('LeadModel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Define as primary key if not using default
    autoIncrement: true, // Auto-increment the ID value
    allowNull: false,
  },
  program_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  program_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dstPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alt_phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  query_for: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  added_date: {
    type: DataTypes.DATEONLY,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  },
  date_created: {
    type: DataTypes.DATE,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  }
}, {
  timestamps: false, // Disable automatic `createdAt`/`updatedAt` fields
  tableName: 'bolt_lead', // Optional: specify the table name if you want to override the default (pluralized) name
});

// Sync the model with the database
LeadModel.sync({ force: false }).then(() => {
});

module.exports = LeadModel;
