'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;
  require('./router/category_router')(app);
  require('./router/article_router')(app);
  require('./router/tag_router')(app);
};