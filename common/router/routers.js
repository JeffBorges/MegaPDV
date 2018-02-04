exports = {
  registerRouter: function (router) {
    router.addRoute('/@auth', 'app/login');

    router.addRoute('/app/produto', 'app/produto/default');
    router.addRoute('/app/produto/importar', 'app/produto/importar');
    router.addRoute('/app/produto/:id', 'app/produto/obter');

    router.addRoute('/app/cep/:cep', 'app/cep/obter');

    router.addRoute('/app/cliente', 'app/cliente/default');
    router.addRoute('/app/cliente/:id', 'app/cliente/obter');

  }
};
