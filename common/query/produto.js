function selectBaseProduto() {
  return 'SELECT id, nome, ativo, descricao, preco, data_vencimento FROM produto WHERE 1 = 1';
}

function addFiltroNome(consulta) {
  return consulta + ' AND nome ILIKE \'%\' || :nome || \'%\'';
}

function addFiltroDescricao(consulta) {
  return consulta + ' AND descricao ILIKE \'%\' || :descricao || \'%\'';
}

function addFiltroAtivo(consulta) {
  return consulta + ' AND ativo = :ativo';
}

function addFiltroId(consulta) {
  return consulta + ' AND id = :id';
}


exports = {
  selectBaseProduto: selectBaseProduto,
  addFiltroNome: addFiltroNome,
  addFiltroDescricao: addFiltroDescricao,
  addFiltroAtivo: addFiltroAtivo,
  addFiltroId: addFiltroId
};
