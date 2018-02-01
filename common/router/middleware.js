exports = {
  registerMiddleware: function (router, auth) {
    router.addMiddleware(function (params, request, reponse) {
      console.log(request);
      return true;
    });
    //router.addMiddleware(auth);
  }
};
