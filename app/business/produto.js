let etl = require('etl');
let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);
let numberUtil = require('../../common/util/number');
let dateUtil = require('../../common/util/date');
let errorUtil = require('../../common/util/error');
let validation = require('../../common/util/validation');
let query = require('../../common/query/produto');


let regrasValidacao = [
  { field: 'nome', rules: ['required', 'size|max:100'] },
  { field: 'descricao', rules: ['required', 'size|max:500'] },
  { field: 'preco', rules: ['required', 'min|value:0.01', 'max|value:9999999.99']}
];

function prepararConsulta(params) {
  let consulta = query.selectBaseProduto();

  if (params.id) consulta = query.addFiltroId(consulta);
  if (params.ativo !== undefined) consulta = query.addFiltroAtivo(consulta);
  if (params.nome) consulta = query.addFiltroNome(consulta);
  if (params.descricao) consulta = query.addFiltroDescricao(consulta);

  return consulta;
}

function conveterParametrosAntesSalvar(produto) {
  if (!produto.dataVencimento)return produto;
  const produtoConvertido = Object.assign( {data_vencimento: produto.dataVencimento}, produto );
  delete produtoConvertido.dataVencimento;
  return produtoConvertido;
}

function prepararResultado(rs) {
  for(let i = 0; i < rs.length; i++) {
    rs[i].dataVencimento = rs[i].data_vencimento;
    delete rs[i].data_vencimento;
  }
  return rs;
}

function executarBusca(params) {
  params.id = numberUtil.convertStringToInt(params.id);
  return prepararResultado(db.execute(prepararConsulta(params), params));
}

function inserirProduto(params) {
  return db.insert('produto',conveterParametrosAntesSalvar(params));
}

/***************************** Importacao ******************************/
function converterLinhaPlaninha(values) {
  const produto = {
    nome: values.A,
    descricao: values.B,
    preco: parseFloat(values.C)
  };

  const dataVencimento = dateUtil.excelDateToLocalDate(values.D);
  if (dataVencimento) {
    // coloquei o toString pois o modulo database não consegue trarta tipo Data do JS e LocalDate do Java de forma correta.
    produto.dataVencimento = dataVencimento.toString();
  }

  return produto;
}

function processarLinha(options, values) {
  return salvarItenImportacao(converterLinhaPlaninha(values))
}

function salvarItenImportacao(produto) {
  let errors = validation.validate(produto, regrasValidacao);
  if (errors.length) {
    return errors;
  }
  if (inserirProduto(produto).error) {
    return {
      message: 'erro.salvar.produto',
      linha: rowId
    };
  }
}

function lerArquivo(file, response) {
  const errors = [];

  etl({})
    .set_input_xlsx_file(file, 0)
    .take_fields_from_header_row()
    .for_each(function (options, values) {
      const errorsLinha = processarLinha(options, values);
      if (errorsLinha) errors.push({ linha: values.rowId, errors: errorsLinha});
    });
  if (errors.length) errorUtil.registrarErros(response, errors);
}

/***************************** Importacao ******************************/

exports = {
  regrasValidacao: regrasValidacao,
  lerArquivo: lerArquivo,
  executarBusca: executarBusca,
  conveterParametrosAntesSalvar: conveterParametrosAntesSalvar,
  inserirProduto: inserirProduto
};
