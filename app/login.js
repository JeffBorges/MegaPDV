let auth   = require('authentication');
let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);


function selectLogin() {
  return 'SELECT f.id, f.nome, p.id as id_perfil, p.nome nome_perfil '+
    'FROM funcionario f INNER JOIN perfil p ON f.id_perfil = p.id '+
    'WHERE f.ativo = TRUE '+
    'AND p.ativo = TRUE '+
    'AND f.username = :username '+
    'AND f.senha = :senha';
}

function selectRoles() {
  return 'select nome_role from perfil_roles WHERE id_perfil = :id_perfil';
}

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
  let rs = db.execute(selectRoles(), {id_perfil: idPerfil});
  return converterRoles(rs);
}

function prepararRetornoUsuario(resultado) {
  let usuario = converterUsuario(resultado);
  usuario.perfil.roles = consultarRoles(usuario.perfil.id);
  return usuario;
}

function login (params, request, response) {
  let usuario = db.execute(selectLogin(), {username: params.username, senha: params.senha});
  if (usuario && usuario.length > 0) {
    auth.createAuthentication(params, request, response, 1, 'mega-pdv', prepararRetornoUsuario(usuario[0]));
    response.json({loginOk: true});
    return;
  }
  response.json({loginOk: false, message: 'Usuário ou senha incorretos.'});
}

function logout (params, request, response) {
  auth.destroyAuthentication(params, request, response)
}

exports = {
  login: login,
  logout: logout
};
