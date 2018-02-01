exports = {
  registerRouter: function (router) {
    router.addRoute('/@auth', 'app/login');

    router.addRoute('/app/produto', 'app/produto/default');
    router.addRoute('/app/produto/:id', 'app/produto/obter');
  }
};
