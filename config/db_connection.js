const { Sequelize } = require('sequelize');
// Configure your database connection
const sequelize1 = new Sequelize('db_redcaratjewellery', 'root', '', {
  host: '127.0.0.1',    // Your database host
  dialect: 'mysql',     // Use the correct dialect (mysql, postgres, sqlite, etc.)
  logging: false,       // Set to true if you want to log SQL queries
  timezone: '+05:30', // Set timezone to IST (India Standard Time)
});

const sequelize2 = new Sequelize('db_redcaratjewellery', 'root', '', {
  host: '127.0.0.1',    // Your database host
  dialect: 'mysql',     // Use the correct dialect (mysql, postgres, sqlite, etc.)
  logging: false,       // Set to true if you want to log SQL queries
  timezone: '+05:30', // Set timezone to IST (India Standard Time)
});

module.exports = {sequelize1,sequelize2};

