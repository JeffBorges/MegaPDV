let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);
let query = require('../../common/query/endereco');
let dbUtil = require('../common/util/database');

let regrasValidacao = [
  { field: 'cep', rules: ['required', 'size|max:8'] },
  { field: 'logradouro', rules: ['required', 'size|max:150'] },
  { field: 'complemento', rules: [ 'size|max:200'] },
  { field: 'bairro', rules: ['required', 'size|max:150'] },
  { field: 'numero', rules: ['required', 'size|max:10'] },
  { field: 'localidade', rules: ['required', 'size|max:150'] },
  { field: 'uf', rules: ['required', 'size|max:2'] }
];

function regrasValidacaoAlterar(endereco) {
  return [ { field: 'id', rules: ['required', 'min:1'] } ].concat(regrasValidacao);
}

function prepararConsulta(params) {
  let consulta = query.selectBase();
  if (params.id) consulta = query.addFiltroId(consulta);
  return consulta;
}

function obter(params) {
  const endereco = db.execute(prepararConsulta(params), params);
  if (endereco && endereco.length) return endereco[0];
}

function inserir(db, endereco) {
  let rs = db.insert('endereco', endereco);
  if (!rs.error) {
    return dbUtil.preencherChaveAposInsert(rs, endereco);
  }
  return rs;
}

function atualizar(db, endereco) {
  return db.update('endereco', (endereco), { id: endereco.id } );
}

function deletar(db, idEndereco) {
  return db.delete('endereco', { id: idEndereco });
}

exports = {
  regrasValidacao: regrasValidacao,
  regrasValidacaoAlterar: regrasValidacaoAlterar,
  obter: obter,
  inserir: inserir,
  atualizar: atualizar,
  deletar: deletar,
};
