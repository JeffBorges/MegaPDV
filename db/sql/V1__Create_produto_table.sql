CREATE TABLE produto (
  id    SERIAL,
  nome  VARCHAR(100)   NOT NULL,
  descricao varchar(500) NOT NULL,
  preco NUMERIC(10, 2) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (id)
);
