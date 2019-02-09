const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
      '/callback',
      '/auth',
      '/api'
    ], { target: 'http://localhost:1994/' }));
};
