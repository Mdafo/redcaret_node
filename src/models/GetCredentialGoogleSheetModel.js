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
  
  file_name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_type : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_status : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  added_date: {
    type: DataTypes.DATEONLY,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  }
}, {
  timestamps: false,
  // Optionally add other options for timestamps or table names
  tableName: 'googleSheetReaderDemoCredential',  // Optional: specify the table name if you want to override the default (pluralized) name
});

// Sync the model with the database
GoogleSheetModel.sync({ force: false }).then(() => {
});

module.exports = GoogleSheetModel;
