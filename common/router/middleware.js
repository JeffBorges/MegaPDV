let authorization = require('./authorization');

exports = {
  registerMiddleware: function (router, auth) {
    router.addMiddleware(function (params, request, response) {
      response.addHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
      return true;
    })

    router.addMiddleware(auth);

    router.addMiddleware(authorization);
  }
};
