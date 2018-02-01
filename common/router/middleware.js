let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);
let errorUtil = require('../util/error');
let authentication = getBitcodeConfig('authentication')();

function selectRoles() {
  return 'SELECT r.nome ' +
           'FROM roles r ' +
          'WHERE :uri SIMILAR TO r.uri ' +
          'AND method = :method '
}

function consultarRole(uri, method) {
  return db.execute(selectRoles(), {uri: uri, method: method});
}

function validarUriPublica(uri) {
  return authentication.notAuthenticatedUrls && authentication.notAuthenticatedUrls.indexOf(uri) >= 0;
}

function validarUriRole(uri, method, usuario) {
  let role = consultarRole(uri, method);
  return role &&
    role.length &&
    role[0].nome &&
    usuario.perfil.roles &&
    usuario.perfil.roles.indexOf(role[0].nome) >= 0
}

function validarAcesso(request, response) {
  if (validarUriPublica(request.requestURI)
    || validarUriRole(request.requestURI, request.method, request.userData.data)) {
    return true;
  }
  errorUtil.registrarErro(response, 'error.forbidden', 403);
  return false;
}

exports = {
  registerMiddleware: function (router, auth) {
    router.addMiddleware(auth);
    router.addMiddleware(function (params, request, reponse) {
      console.log(request);
      return validarAcesso(request, reponse);
    });
  }
};
