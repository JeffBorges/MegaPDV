INSERT INTO roles(nome, uri, method) values ('PRODUTO_BUSCAR', '/app/produto[/]?', 'GET');
INSERT INTO roles(nome, uri, method) values ('PRODUTO_SALVAR', '/app/produto[/]?', 'POST');
INSERT INTO roles(nome, uri, method) values ('PRODUTO_ALTERAR', '/app/produto[/]?', 'PUT');
INSERT INTO roles(nome, uri, method) values ('PRODUTO_DELETAR', '/app/produto[/]?', 'DELETE');

INSERT INTO perfil_roles(id_perfil, nome_role)
VALUES ((select id from perfil where nome = 'Gerente'), 'PRODUTO_BUSCAR');

INSERT INTO perfil_roles(id_perfil, nome_role)
VALUES ((select id from perfil where nome = 'Gerente'), 'PRODUTO_SALVAR');

INSERT INTO perfil_roles(id_perfil, nome_role)
VALUES ((select id from perfil where nome = 'Gerente'), 'PRODUTO_ALTERAR');

INSERT INTO perfil_roles(id_perfil, nome_role)
VALUES ((select id from perfil where nome = 'Gerente'), 'PRODUTO_DELETAR');

