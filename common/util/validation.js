function required(object, field) {
  let error;
  let value = object[field.field];
  if ((value === undefined) || (typeof value === 'string' && !value.trim())) {
    error = 'required.' + field.field;
  }
  return error;
}

function size(object, field, rule) {
  let error;
  const min = rule.params.min || 0;
  const max = rule.params.max || 0;
  let value = object[field.field];

  if (typeof value !== 'string' || !value) return error;

  if (value.length < min || value.length > max) {
    error = {
      message: 'size.' + field.field,
      params: {
        min: min,
        max: max
      }
    };
  }

  return error;
}

function min(object, field, rule) {
  let error;
  const min = rule.params.value || 0;
  let value = object[field.field];

  if (typeof value !== 'number' || value === undefined) return error;

  if (value < min) {
    error = {
      message: 'min.' + field.field,
      params: { min: min }
    };
  }

  return error;
}

function max(object, field, rule) {
  let error;
  const max = rule.params.value || 0;
  let value = object[field.field];

  if (typeof value !== 'number' || value === undefined) return error;

  if (value > max) {
    error = {
      message: 'max.' + field.field,
      params: { max: max }
    };
  }

  return error;
}

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
  switch (rule.rule) {
    case 'required':
      error = required(object, field, rule);
      break;
    case 'size':
      error = size(object, field, rule);
      break;
    case 'min':
      error = min(object, field, rule);
      break;
    case 'max':
      error = max(object, field, rule);
      break;
  }
  return error;
}

function validateField(object, field) {
  let errors = [];
  field.rules.forEach(function (sRule) {
    let error = validateFieldWithRule(object, field, prepareRule(sRule));
    if (error) errors.push(error);
  });
  return errors;
}

function validate(object, fields) {
  let errors = [];
  fields.forEach(function (field) {
    errors = errors.concat(validateField(object, field));
  });
  return errors;
}

exports = {
  validate: validate
};
