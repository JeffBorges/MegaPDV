let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);
let numberUtil = require('../common/util/number');
let errorUtil = require('../common/util/error');
let dbUtil = require('../common/util/database');

function selectBaseProduto() {
  return 'SELECT id, nome, ativo, descricao, preco FROM produto WHERE 1 = 1';
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

function prepararConsulta(params) {
  let consulta = selectBaseProduto();

  if (params.id) consulta = addFiltroId(consulta);
  if (params.ativo) consulta = addFiltroAtivo(consulta);
  if (params.nome) consulta = addFiltroNome(consulta);
  if (params.descricao) consulta = addFiltroDescricao(consulta);

  return consulta;
}

function executarBuscabuscar(params, request, response) {
  params.id = numberUtil.convertStringToInt(params.id);
  return db.execute(prepararConsulta(params), params);
}

function buscar(params, request, response) {
  response.json(executarBuscabuscar(params, request, response));
}

function obter(params, request, response) {
  let produtos = executarBuscabuscar(params, request, response);
  if (produtos && produtos.length) {
    response.json(produtos[0]);
    return;
  }
  errorUtil.registrarErro(response, 'nao.encontrado.produto', 404);
}

function salvar(params, request, response) {
  let rs = db.insert('produto', params);
  dbUtil.tratarRetorno(response, rs, 'erro.salvar.produto', params, function () { response.json(dbUtil.preencherChaveAposInsert(rs, params)) });
}

function atualizar(params, request, response) {
  let rs = db.update('produto', params, { id: params.id } );
  dbUtil.tratarRetorno(response, rs, 'erro.atualizar.produto');
}

function deletar(params, request, response) {
  let rs = db.delete('produto', params);
  dbUtil.tratarRetorno(response, rs, 'erro.deletar.produto');
}

exports = {
  POST: {
    default: salvar,
  },
  GET: {
    obter: obter,
    default: buscar
  },
  PUT: {
    default: atualizar,
  },
  DELETE: {
    default: deletar,
  }
};
