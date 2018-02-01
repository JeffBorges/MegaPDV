function registrarErro(response, mensagem, status) {
  response.json({errors: [mensagem]}, status || 400);
}

function registrarErros(response, errors, status) {
  response.json({errors: errors }, status || 400);
}


exports = {
  registrarErro: registrarErro,
  registrarErros: registrarErros
};
