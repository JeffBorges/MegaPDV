INSERT INTO roles(nome, uri, method) values ('PRODUTO_IMPORTAR', '/app/produto/importar[/]?', 'POST');;

INSERT INTO perfil_roles(id_perfil, nome_role)
VALUES ((select id from perfil where nome = 'Gerente'), 'PRODUTO_IMPORTAR');
