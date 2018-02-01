function preencherChaveAposInsert(resultado, objeto) {
  if (resultado.keys && resultado.keys[0])
    return Object.assign({id: resultado.keys[0]}, objeto);
  return objeto;
}

function registrarErroNoResponse(response, resultado, mensagem) {
  response.json({errors: [mensagem]}, 400);
}

function tratarRetorno(response, resultado, mensagemErro, params, callbackSucesso) {
  if (resultado.error) {
    registrarErroNoResponse(response, resultado, mensagem);
  } else {
    if (callbackSucesso) callbackSucesso();
  }
}


exports = {
  preencherChaveAposInsert: preencherChaveAposInsert,
  registrarErroNoResponse: registrarErroNoResponse,
  tratarRetorno: tratarRetorno
};
