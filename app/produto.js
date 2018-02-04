let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);
let errorUtil = require('../common/util/error');
let dbUtil = require('../common/util/database');
let validation = require('../common/util/validation');
let fileUtil = require('../common/util/file');
let business = require('./business/produto');

function buscar(params, request, response) {
  response.json(business.executarBusca(params, request, response));
}

function obter(params, request, response) {
  let produtos = business.executarBusca(params, request, response);
  if (produtos && produtos.length) {
    response.json(produtos[0]);
    return;
  }
  errorUtil.registrarErro(response, 'nao.encontrado.produto', 404);
}

function salvar(params, request, response) {
  let errors = validation.validate(params, business.regrasValidacao);
  if (errors.length) {
    errorUtil.registrarErros(response, errors);
    return;
  }
  let rs = business.inserirProduto(params);
  dbUtil.tratarRetorno(response, rs, 'erro.salvar.produto', params,
    function () { response.json(dbUtil.preencherChaveAposInsert(rs, params)) });
}

function atualizar(params, request, response) {
  let errors = validation.validate(params, [{ field: 'id', rules: ['required', 'min:1']}].concat(business.regrasValidacao));
  if (errors.length) {
    errorUtil.registrarErros(response, errors);
    return;
  }
  let rs = db.update('produto', business.conveterParametrosAntesSalvar(params), { id: params.id } );
  dbUtil.tratarRetorno(response, rs, 'erro.atualizar.produto');
}

function deletar(params, request, response) {
  let errors = validation.validate(params, [{ field: 'id', rules: ['required', 'min:1']}]);
  if (errors.length) {
    errorUtil.registrarErros(response, errors);
    return;
  }
  let rs = db.delete('produto', params);
  dbUtil.tratarRetorno(response, rs, 'erro.deletar.produto');
}

function importar(params, request, response) {
  try {
    business.lerArquivo(fileUtil.requestFileStorage(request, 'produtos', 'xlsx'), response);
  } catch (exception) {
    print(exception);
    print(exception.stack);
    errorUtil.registrarErros(response, 'error.importar.produto', 500);
  }
}

exports = {
  POST: {
    default: salvar,
    importar: importar
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
