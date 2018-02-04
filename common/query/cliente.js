function selectBase() {
  return 'SELECT id, nome, cpf, email, id_endereco FROM cliente WHERE 1 = 1';
}

function addFiltroNome(consulta) {
  return consulta + ' AND nome ILIKE \'%\' || :nome || \'%\'';
}

function addFiltroEmail(consulta) {
  return consulta + ' AND email ILIKE \'%\' || :email || \'%\'';
}

function addFiltroCPF(consulta) {
  return consulta + ' AND cpf ILIKE \'%\' || :cpf || \'%\'';
}

function addFiltroId(consulta) {
  return consulta + ' AND id = :id';
}

function selectIdEndereco() {
  return 'SELECT id_endereco FROM cliente WHERE 1 = 1';
}


exports = {
  selectBase: selectBase,
  addFiltroNome: addFiltroNome,
  addFiltroEmail: addFiltroEmail,
  addFiltroCPF: addFiltroCPF,
  addFiltroId: addFiltroId,
  selectIdEndereco: selectIdEndereco
};
