let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);
let errorUtil = require('../util/error');
let authentication = getBitcodeConfig('authentication')();
let query = require('../query/authorization');

function findRoles(uri, method) {
  return db.execute(query.selectRoles(), {uri: uri, method: method});
}

function validatePublicUri(uri) {
  return authentication.notAuthenticatedUrls && authentication.notAuthenticatedUrls.indexOf(uri) >= 0;
}

function validateRoleUri(uri, method, usuario) {
  let role = findRoles(uri, method);
  return role &&
    role.length &&
    role[0].nome &&
    usuario.perfil.roles &&
    usuario.perfil.roles.indexOf(role[0].nome) >= 0
}

function validateAccess(params, request, response) {
  if (validatePublicUri(request.requestURI)
    || validateRoleUri(request.requestURI, request.method, request.userData.data)) {
    return true;
  }

  errorUtil.registrarErro(response, 'error.forbidden', 403);
  return false;
}

exports = {
  middleware: validateAccess
};
