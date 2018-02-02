let auth   = require('authentication');
let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);
let errorUtil = require('../common/util/error');
let query = require('../common/query/login');

function converterRoles(roles) {
  return roles.map(function(r) { return r.nome_role; });
}

function converterUsuario(usuario){
  return {
    id: usuario.id,
    nome: usuario.nome,
    perfil: {
      id: usuario.id_perfil,
      nome: usuario.nome_perfil
    }
  };
}

function consultarRoles(idPerfil) {
  let rs = db.execute(query.selectRoles(), {id_perfil: idPerfil});
  return converterRoles(rs);
}

function prepararRetornoUsuario(resultado) {
  let usuario = converterUsuario(resultado);
  usuario.perfil.roles = consultarRoles(usuario.perfil.id);
  return usuario;
}

function login (params, request, response) {
  if (!params.username || !params.senha) {
    errorUtil.registrarErro(response, 'error.required.usuario_senha');
    return;
  }
  let usuario = db.execute(query.selectLogin(), {username: params.username, senha: params.senha});
  if (usuario && usuario.length > 0) {
    auth.createAuthentication(params, request, response, 1, 'mega-pdv', prepararRetornoUsuario(usuario[0]));
    response.json({loginOk: true});
    return;
  }
  errorUtil.registrarErro(response, 'error.invalid.usuario_senha');
}

function logout (params, request, response) {
  auth.destroyAuthentication(params, request, response)
}

exports = {
  login: login,
  logout: logout
};
