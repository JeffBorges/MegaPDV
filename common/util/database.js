let errorUtil = require('./error');

function preencherChaveAposInsert(resultado, objeto) {
  console.log(resultado);
  console.log(objeto);
  if (resultado.keys && resultado.keys[0])
    return Object.assign({id: resultado.keys[0]}, objeto);
  return objeto;
}

function tratarRetorno(response, resultado, mensagemErro, params, callbackSucesso) {
  if (resultado.error) {
    if (resultado.execption) print(resultado.execption.stack);
    errorUtil.registrarErro(response, mensagemErro);
  } else {
    if (callbackSucesso) callbackSucesso();
  }
}


exports = {
  preencherChaveAposInsert: preencherChaveAposInsert,
  tratarRetorno: tratarRetorno
};
