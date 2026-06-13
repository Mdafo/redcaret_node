// const { Sequelize } = require('sequelize');
// // Configure your database connection
// const sequelize1 = new Sequelize(
//   'u683267791_db_redcarat', 
//   'u683267791_admin_redcarat',
//    '@Redcarat2026',
//   {
//    host: 'auth-db1642.hstgr.io',
//     dialect: 'mysql',
//     logging: false,
//     timezone: '+05:30',
// });

// const sequelize2 = new Sequelize('u683267791_db_redcarat', 'u683267791_admin_redcarat', '@Redcarat2026', {
//     host: 'auth-db1642.hstgr.io',
//     dialect: 'mysql',
//     logging: false,
//     timezone: '+05:30',
// });

// module.exports = {sequelize1,sequelize2};
const { Sequelize } = require('sequelize');

const sequelize1 = new Sequelize(
  'u683267791_db_redcarat',
  'u683267791_admin_redcarat',
  '@Redcarat2026',
  {
    host: 'auth-db1642.hstgr.io',
    dialect: 'mysql',
    logging: false,
    timezone: '+05:30',
  }
);

module.exports = sequelize1;