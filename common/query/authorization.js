function selectRoles() {
  return 'SELECT r.nome ' +
    'FROM roles r ' +
    'WHERE :uri SIMILAR TO r.uri ' +
    'AND method = :method '
}

exports = {
  selectRoles: selectRoles,
};
