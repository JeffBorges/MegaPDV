function isEmail(email){
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function email(object, field, rule) {
  let error;
  let value = object[field.field];

  if (typeof value !== 'string' || !value) return;

  if (!isEmail(value)) {
    error = 'invalid.' + field.field;
  }

  return error;
}

exports = { email: email };
