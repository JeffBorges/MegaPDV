
/******************* http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js *******************/
function validaCPF(str) {
  let Soma;
  let Resto;
  Soma = 0;
  if (str === "00000000000") return false;

  for (let i=1; i<=9; i++) Soma = Soma + parseInt(str.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11))  Resto = 0;
  if (Resto !== parseInt(str.substring(9, 10)) ) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(str.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11))  Resto = 0;
  return Resto === parseInt(str.substring(10, 11));

}

function cpf(object, field) {
  let error;
  let value = object[field.field];

  if (typeof value !== 'string' || !value) return;

  if (!validaCPF(value)) {
    error = 'invalid.' + field.field;
  }

  return error;
}

exports = { cpf: cpf };
