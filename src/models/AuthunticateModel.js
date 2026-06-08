const {sequelize1,sequelize2} = require('../../config/db_connection'); // Correct import from db_connection.js
const { DataTypes } = require('sequelize');

// Define the AuthModel (renamed for simplicity)
const AuthunticateModel = sequelize1.define('AuthunticateModel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,  // Define as primary key if not using default
    autoIncrement: true,  // Auto-increment the ID value
    allowNull: false,
  },
  api_key: {
    type: DataTypes.STRING,
    allowNull: false,  // This ensures the API key cannot be null
  },
  is_active: {
    type: DataTypes.INTEGER, // Active status (1 for active, 0 for inactive)
    allowNull: false,  // It should always have a value (either 1 or 0)
    defaultValue: 1,    // Default value is 1 (active)
  },
}, {
  timestamps: false,
  tableName: 'bolt_vendor_access_apikey',  // Make sure this matches the actual table name
});

// Sync the model with the database
AuthunticateModel.sync({ force: false }).then(() => {
  console.log('Model has been synchronized with the database');
});

module.exports = AuthunticateModel;
