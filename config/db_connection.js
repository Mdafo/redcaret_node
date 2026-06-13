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

// DB_CONNECTION=mysql
// DB_HOST=127.0.0.1
// DB_PORT=3306
// DB_DATABASE=u683267791_db_redcarat
// DB_USERNAME=u683267791_admin_redcarat
// DB_PASSWORD=@Redcarat2026

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

const sequelize2 = new Sequelize(
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

 module.exports = {sequelize1,sequelize2};