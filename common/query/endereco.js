function selectBase() {
  return 'SELECT id, cep, logradouro, complemento, bairro, numero, localidade, uf FROM endereco WHERE 1 = 1';
}

function addFiltroId(consulta) {
  return consulta + ' AND id = :id';
}

exports = {
  selectBase: selectBase,
  addFiltroId: addFiltroId
};
