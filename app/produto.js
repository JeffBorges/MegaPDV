let etl = require('etl');
let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);
let numberUtil = require('../common/util/number');
let errorUtil = require('../common/util/error');
let dbUtil = require('../common/util/database');
let validation = require('../common/util/validation');
let fileUtil = require('../common/util/file');
let query = require('../common/query/produto');

let regrasValidacao = [
  { field: 'nome', rules: ['required', 'size|max:100'] },
  { field: 'descricao', rules: ['required', 'size|max:500'] },
  { field: 'preco', rules: ['required', 'min|value:0.01', 'max|value:9999999.99']}
];

function prepararConsulta(params) {
  let consulta = query.selectBaseProduto();

  if (params.id) consulta = query.addFiltroId(consulta);
  if (params.ativo) consulta = query.addFiltroAtivo(consulta);
  if (params.nome) consulta = query.addFiltroNome(consulta);
  if (params.descricao) consulta = query.addFiltroDescricao(consulta);

  return consulta;
}

function executarBusca(params) {
  params.id = numberUtil.convertStringToInt(params.id);
  return db.execute(prepararConsulta(params), params);
}

/***************************** Rotas ******************************/

function buscar(params, request, response) {
  response.json(executarBusca(params, request, response));
}

function obter(params, request, response) {
  let produtos = executarBusca(params, request, response);
  if (produtos && produtos.length) {
    response.json(produtos[0]);
    return;
  }
  errorUtil.registrarErro(response, 'nao.encontrado.produto', 404);
}

function salvar(params, request, response) {
  let errors = validation.validate(params, regrasValidacao);
  if (errors.length) {
    errorUtil.registrarErros(response, errors);
    return;
  }
  let rs = db.insert('produto', params);
  dbUtil.tratarRetorno(response, rs, 'erro.salvar.produto', params,
    function () { response.json(dbUtil.preencherChaveAposInsert(rs, params)) });
}

function atualizar(params, request, response) {
  let errors = validation.validate(params, [{ field: 'id', rules: ['required', 'min:1']}].concat(regrasValidacao));
  if (errors.length) {
    errorUtil.registrarErros(response, errors);
    return;
  }
  let rs = db.update('produto', params, { id: params.id } );
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
    let file = fileUtil.requestFileStorage(request, 'produtos', 'xlsx');

    etl({})
      .set_input_xlsx_file(file, 0)
      .take_fields_from_header_row()
      .for_each(function (options, values) {
        console.log(options);
        console.log(values);
      });
  } catch (exception) {
    print(exception);
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
