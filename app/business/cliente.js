let dbm = require('database');
let dbConfig = getBitcodeConfig('database')();
let db = dbm.createDbInstance(dbConfig);
let numberUtil = require('../../common/util/number');
let query = require('../../common/query/cliente');
let enderecoBusiness = require('./endereco');

let regrasValidacao = [
  { field: 'nome', rules: ['required', 'size|max:100'] },
  { field: 'cpf', rules: ['required', 'size|max:11', 'cpf'] },
  { field: 'email', rules: ['required', 'size|max:150', 'email'] }
];

let regraValidacaoEndereco = { field: 'endereco', rules: ['required'] };

function montarValidacaoInserir() {
  let endereco = Object.assign(regraValidacaoEndereco, { fields: enderecoBusiness.regrasValidacao });
  regrasValidacao.push(endereco);
  return regrasValidacao;
}

function montarValidacaoAlterar() {
  let regras = [{ field: 'id', rules: ['required', 'min:1']}].concat(regrasValidacao);
  let endereco = Object.assign(regraValidacaoEndereco, { fields: enderecoBusiness.regrasValidacaoAlterar() });
  regras.push(endereco);
  return regras;
}

function prepararConsulta(params, consulta) {
  consulta = consulta || query.selectBase();

  if (params.id) consulta = query.addFiltroId(consulta);
  if (params.email) consulta = query.addFiltroEmail(consulta);
  if (params.nome) consulta = query.addFiltroNome(consulta);
  if (params.cpf) consulta = query.addFiltroCPF(consulta);

  return consulta;
}

function conveterParametrosAntesSalvar(cliente) {
  const clienteConvertido = Object.assign( {id_endereco: cliente.endereco.id}, cliente );
  delete clienteConvertido.endereco;
  return clienteConvertido;
}

function prepararResultado(rs) {
  for(let i = 0; i < rs.length; i++) {
    rs[i].idEndereco = rs[i].id_endereco;
    delete rs[i].id_endereco;
  }
  return rs;
}

function executarBusca(params) {
  params.id = numberUtil.convertStringToInt(params.id);
  return prepararResultado(db.execute(prepararConsulta(params), params));
}

function executarBuscaIdEndereco(params) {
  const clientes = db.execute(prepararConsulta(params, query.selectIdEndereco()), params);
  if (clientes && clientes.length) return clientes[0].id_endereco;
}

function executarInclusao(db, cliente) {
  let rs = enderecoBusiness.inserir(db, cliente.endereco);
  if (rs.error) {
    rs.mensagem = 'erro.salvar.endereco';
    return rs;
  }
  cliente.endereco = rs;
  return db.insert('cliente',conveterParametrosAntesSalvar(cliente));
}

function executarAlteracao(db, cliente) {
  let rs = enderecoBusiness.atualizar(db, cliente.endereco);
  if (rs.error) {
    rs.mensagem = 'erro.alterar.endereco';
    return rs;
  }
  return db.update('cliente', conveterParametrosAntesSalvar(cliente), { id: cliente.id } );
}

function executarDelete(db, cliente) {
  const idEndereco = executarBuscaIdEndereco(cliente);
  let rs = db.delete('cliente', cliente);
  if (!rs.error && idEndereco) {
    rs = enderecoBusiness.deletar(db, idEndereco);
    if (rs.error) rs.mensagem = 'erro.deletar.endereco';
  }
  return rs;
}

exports = {
  montarValidacaoInserir: montarValidacaoInserir,
  montarValidacaoAlterar: montarValidacaoAlterar,
  executarBusca: executarBusca,
  executarInclusao: executarInclusao,
  executarAlteracao: executarAlteracao,
  executarDelete: executarDelete,
  conveterParametrosAntesSalvar: conveterParametrosAntesSalvar,
};
