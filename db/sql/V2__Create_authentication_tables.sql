CREATE TABLE perfil (
  id    SERIAL,
  nome  VARCHAR(100) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  nome   VARCHAR(150) NOT NULL,
  uri    VARCHAR(300) NOT NULL,
  method VARCHAR(10)  NOT NULL,
  PRIMARY KEY (nome)
);

CREATE TABLE perfil_roles (
  id_perfil INTEGER NOT NULL,
  nome_role VARCHAR(150) NOT NULL,
  foreign key(id_perfil) references perfil(id),
  foreign key(nome_role) references roles(nome)
);

INSERT INTO perfil (nome) VALUES ('Gerente');
INSERT INTO perfil (nome) VALUES ('Vendedor');

INSERT INTO roles(nome, uri, method) values ('PRODUTO_OBTER', '/app/produto/:id', 'GET');

INSERT INTO perfil_roles(id_perfil, nome_role)
VALUES (
  (select id from perfil where nome = 'Gerente'),
  'PRODUTO_OBTER'
)
