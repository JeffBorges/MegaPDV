function max(object, field, rule) {
  let error;
  const max = rule.params.value || 0;
  let value = object[field.field];

  if (typeof value !== 'number' || value === undefined) return;

  if (value > max) {
    error = {
      message: 'max.' + field.field,
      params: { max: max }
    };
  }

  return error;
}

exports = { max: max };
