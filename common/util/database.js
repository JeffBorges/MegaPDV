let errorUtil = require('../common/util/error');

function preencherChaveAposInsert(resultado, objeto) {
  if (resultado.keys && resultado.keys[0])
    return Object.assign({id: resultado.keys[0]}, objeto);
  return objeto;
}

function tratarRetorno(response, resultado, mensagemErro, params, callbackSucesso) {
  if (resultado.error) {
    errorUtil.registrarErro(response, mensagem);
  } else {
    if (callbackSucesso) callbackSucesso();
  }
}


exports = {
  preencherChaveAposInsert: preencherChaveAposInsert,
  tratarRetorno: tratarRetorno
};
