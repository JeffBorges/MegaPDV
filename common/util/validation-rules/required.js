function required(object, field) {
  let error;
  let value = object[field.field];
  if ((value === undefined) || (typeof value === 'string' && !value.trim())) {
    error = 'required.' + field.field;
  }
  return error;
}

exports = { required: required };
