const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db_connection');
const {sequelize1,sequelize2} = require('../../config/db_connection');

// Define the Category model
const GoogleSheetTrackerModel = sequelize1.define('GoogleSheetTrackerModel', {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true, // Define as primary key if not using default
    autoIncrement: true, // Auto-increment the ID value
    allowNull: false,
  },
  
  spreadsheet_id : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spreadsheet_name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spreadsheet_url : {
    type: DataTypes.TEXT,
    allowNull: false,
  },
 
  last_processed_row : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  added_date: {
    type: DataTypes.DATEONLY,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  },
  update_date : {
    type: DataTypes.DATEONLY,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  },
  updated_date_time : {
    type: DataTypes.DATE,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  },
  spreadsheet_status : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spreadsheet_active_date : {
    type: DataTypes.DATEONLY,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  }, 
  spreadsheet_active_date_time : {
    type: DataTypes.DATE,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  },
  spreadsheet_inactive_date : {
    type: DataTypes.DATEONLY,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  }, 
  spreadsheet_inactive_date_time : {
    type: DataTypes.DATE,  // Use DataTypes.DATE for a timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current date/time if not provided
  }
 
}, {
  timestamps: false,
  // Optionally add other options for timestamps or table names
  tableName: 'google_sheet_tracker_record_count',  // Optional: specify the table name if you want to override the default (pluralized) name
});

// Sync the model with the database
GoogleSheetTrackerModel.sync({ force: false }).then(() => {
});

module.exports = GoogleSheetTrackerModel;
