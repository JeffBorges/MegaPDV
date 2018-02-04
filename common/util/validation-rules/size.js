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

exports = { size: size };
