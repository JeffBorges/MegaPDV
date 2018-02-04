function min(object, field, rule) {
  let error;
  const min = rule.params.value || 0;
  let value = object[field.field];

  if (typeof value !== 'number' || value === undefined) return;

  if (value < min) {
    error = {
      message: 'min.' + field.field,
      params: { min: min }
    };
  }

  return error;
}

exports = { min: min };
