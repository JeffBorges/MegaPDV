let rules = require('./validation-rules/index');
let errorUtil = require('./error');

function prepareParams(rule, sParam) {
  let rs = sParam.split(':');
  if (rs.length > 1) rule.params[rs[0]] = rs[1];
  return rule;
}

function prepareRule(sRule) {
  let rs = sRule.split('|');
  let rule = {params: {}};
  for (let i = 0; i < rs.length; i++) {
    if (i === 0) rule.rule = rs[i];
    else rule = prepareParams(rule, rs[i]);
  }
  return rule;
}

function validateFieldWithRule(object, field, rule) {
  let error;
  let fnRule = rules[rule.rule];
  if (fnRule !== undefined) error = fnRule(object, field, rule);
  return error;
}

function validateField(object, field) {
  let errors = [];
  for (let i = 0; i < field.rules.length; i++) {
    let error = validateFieldWithRule(object, field, prepareRule(field.rules[i]));
    if (error) errors.push(error);
  }
  return errors;
}

function validateSubObject(object, field) {
  const result = [];
  const errors = validate(object[field.field], field.fields);
  if (errors && errors.length) result.push({ field: field.field, errors: errors})
  return result;
}

function validate(object, fields) {
  let errors = [];
  for (let i = 0; i < fields.length; i++) {
    let field = fields[i];
    errors = errors.concat(validateField(object, field));
    if (field.fields && object[field.field]) errors = errors.concat(validateSubObject(object, field));
  }
  return errors;
}

function validateExecFunctionIfSuccess(params, response, fields, fnc) {
  let errors = validate(params, fields);
  if (errors.length) errorUtil.registrarErros(response, errors);
  else fnc();
}

exports = {
  validate: validate,
  validateExecFunctionIfSuccess: validateExecFunctionIfSuccess
};
