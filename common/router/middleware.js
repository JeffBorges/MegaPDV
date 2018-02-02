let authorization = require('./authorization');

exports = {
  registerMiddleware: function (router, auth) {
    router.addMiddleware(auth);
    router.addMiddleware(function (params, request, reponse) {
      return authorization.validateAccess(request, reponse);
    });
  }
};
