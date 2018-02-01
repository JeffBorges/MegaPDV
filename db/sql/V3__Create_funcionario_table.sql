CREATE TABLE funcionario (
  id    SERIAL,
  nome  VARCHAR(100)   NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  id_gerente INTEGER,
  username VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  id_perfil INTEGER NOT NULL,
  PRIMARY KEY (id),
  foreign key(id_gerente) references funcionario(id),
  foreign key(id_perfil) references perfil(id)
);

INSERT INTO funcionario (nome, username, senha, id_perfil)
  VALUES ('Gerente', 'gerente', 'gerente', (select id from perfil where nome = 'Gerente'))
