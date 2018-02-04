let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);
let errorUtil = require('../common/util/error');
let dbUtil = require('../common/util/database');
let validation = require('../common/util/validation');
let business = require('./business/cliente');
let enderecoBusiness = require('./business/endereco');

function buscar(params, request, response) {
  response.json(business.executarBusca(params, request, response));
}

function preencherEndereco(cliente) {
  cliente.endereco = enderecoBusiness.obter({ id: cliente.idEndereco});
  delete cliente.idEndereco;
  return cliente;
}

function obter(params, request, response) {
  let clientes = business.executarBusca(params, request, response);
  if (clientes && clientes.length) response.json(preencherEndereco(clientes[0]));
  else errorUtil.registrarErro(response, 'nao.encontrado.cliente', 404);
}

function salvar(params, request, response) {
  validation.validateExecFunctionIfSuccess(params, response, business.montarValidacaoInserir(),
    function () {
      const rs = db.executeInSingleTransaction(business.executarInclusao, params);
      dbUtil.tratarRetorno(response, rs, rs.mensagem || 'erro.salvar.cliente', params,
        function () { response.json(dbUtil.preencherChaveAposInsert(rs.result, params)) });
    });
}

function atualizar(params, request, response) {
  validation.validateExecFunctionIfSuccess(params, response, business.montarValidacaoAlterar(),
    function () {
      const rs = db.executeInSingleTransaction(business.executarAlteracao, params);
      dbUtil.tratarRetorno(response, rs, rs.mensagem || 'erro.salvar.cliente');
    });
}

function deletar(params, request, response) {
  const fields = [{ field: 'id', rules: ['required', 'min:1']}];
  validation.validateExecFunctionIfSuccess(params, response, fields,
    function () {
      const rs = db.executeInSingleTransaction(business.executarDelete, params);
      dbUtil.tratarRetorno(response, rs, rs.mensagem || 'erro.deletar.cliente');
    });
}


exports = {
  POST: {
    default: salvar,
  },
  GET: {
    obter: obter,
    default: buscar,
  },
  PUT: {
    default: atualizar,
  },
  DELETE: {
    default: deletar,
  }
};
