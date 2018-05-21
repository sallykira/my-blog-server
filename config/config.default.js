module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525319213863_8895';

  // add your config here
  config.middleware = [];

  config.sequelize = {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'blog',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '19930711'
  };

  config.security = {
      csrf: {
          enable:false
          // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
          // bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      }
  }

  return config;
};