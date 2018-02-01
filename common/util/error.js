function registrarErro(response, mensagem, status) {
  response.json({errors: [mensagem]}, status);
}

function registrarErros(response, mensagems, status) {
  response.json({errors: [mensagems]}, status);
}


exports = {
  registrarErro: registrarErro,
  registrarErros: registrarErros
};
