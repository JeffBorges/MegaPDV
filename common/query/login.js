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


exports = {
  selectLogin: selectLogin,
  selectRoles: selectRoles,
};
