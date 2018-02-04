let cpf = require('./cpf');
let email = require('./email');
let max = require('./max');
let min = require('./min');
let size = require('./size');
let required = require('./required');

exports = {
  cpf: cpf.cpf,
  email: email.email,
  max: max.max,
  min: min.min,
  required: required.required,
  size: size.size
};
