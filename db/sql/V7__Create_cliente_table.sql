CREATE TABLE endereco (
  id          SERIAL,
  cep         CHAR(8)      NOT NULL,
  logradouro  VARCHAR(150) NOT NULL,
  complemento VARCHAR(200),
  bairro      VARCHAR(150) NOT NULL,
  numero      VARCHAR(10)  NOT NULL,
  localidade  VARCHAR(150) NOT NULL,
  uf          CHAR(2)      NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE cliente (
  id          SERIAL,
  nome        VARCHAR(100) NOT NULL,
  cpf         CHAR(11)     NOT NULL,
  email       VARCHAR(150) NOT NULL,
  id_endereco INTEGER      NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_endereco) REFERENCES endereco (id)
);
