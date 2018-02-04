let httpClient = require('http-client');
let validation = require('../common/util/validation');
let errorUtil = require('../common/util/error');


let regrasValidacao = [{field: 'cep', rules: ['required', 'size|min:8|max:8']}];

function requisicaoViaCEP(cep) {
  return httpClient
    .get('https://viacep.com.br/ws/' + cep + '/json/')
    .charset('UTF-8')
    .contentType('application/json')
    .fetch();
}

function buscarCEP(params, request, response) {
  validation.validateExecFunctionIfSuccess(params, response, regrasValidacao,
    function () {
      const rs = requisicaoViaCEP(params.cep);
      const body = JSON.parse(rs.body);
      if (body.erro) errorUtil.registrarErro(response, 'erro.buscar.cep', 400);
      else response.json(body);
    });
}

exports = {
  GET: {
    obter: buscarCEP
  },
};
