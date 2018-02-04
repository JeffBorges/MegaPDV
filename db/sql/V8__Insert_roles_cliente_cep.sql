INSERT INTO roles (nome, uri, method) VALUES ('CLIENTE_BUSCAR', '/app/cliente[/]?', 'GET');
INSERT INTO roles (nome, uri, method) VALUES ('CLIENTE_SALVAR', '/app/cliente[/]?', 'POST');
INSERT INTO roles (nome, uri, method) VALUES ('CLIENTE_ALTERAR', '/app/cliente[/]?', 'PUT');
INSERT INTO roles (nome, uri, method) VALUES ('CLIENTE_DELETAR', '/app/cliente[/]?', 'DELETE');
INSERT INTO roles (nome, uri, method) VALUES ('CLIENTE_OBTER', '/app/cliente/[0-9]+[/]?', 'GET');
INSERT INTO roles (nome, uri, method) VALUES ('CEP_OBTER', '/app/cep/\d{8}[/]?', 'GET');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Gerente'), 'CEP_OBTER');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Gerente'), 'CLIENTE_BUSCAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Gerente'), 'CLIENTE_SALVAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Gerente'), 'CLIENTE_ALTERAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Gerente'), 'CLIENTE_DELETAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Gerente'), 'CLIENTE_OBTER');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'CLIENTE_BUSCAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'CLIENTE_SALVAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'CLIENTE_ALTERAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'CLIENTE_DELETAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'CLIENTE_OBTER');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'PRODUTO_IMPORTAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'PRODUTO_BUSCAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'PRODUTO_SALVAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'PRODUTO_ALTERAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'PRODUTO_DELETAR');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'PRODUTO_OBTER');

INSERT INTO perfil_roles (id_perfil, nome_role)
VALUES ((SELECT id
         FROM perfil
         WHERE nome = 'Vendedor'), 'CEP_OBTER');


UPDATE roles
SET uri = '/app/produto/[0-9]+[/]?'
WHERE nome = 'PRODUTO_OBTER';
