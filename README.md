Mega PDV
===============

Aplicativo de vendas para exemplificar o uso do [ThrustJS](https://github.com/Thrustjs/thrust).


## Regras
**Nome:** Mega PDV  
Aplicação para loja de produtos eletrônicos

**Perfis:**
* Gerente
* Vendedor

**Telas:**
* Login
* Cadastro cliente
* Cadastro funcionário
* Cadastro produto
* Gestão de venda
* Dashboard

**Funcionalidades:**
* O cadastro do cliente e produto poderá ser feito pelo Gerente ou Vendedor
* O cadastro de funcionário apenas pelo Gerente
* Gerente e vendedor podem efetuar uma venda, porém apenas o Gerente poderá visualizar o dashboard com os gráficos
* Os produtos poderão ser importados via planilha
* No cadastro do cliente, fazer integração com serviço dos Correios para busca do endereço
* Podemos aplicar um desconto no momento da venda baseada em uma regra do produto como valor ou percentual máximo de desconto


## Bando de dados
Para criação do banco de dados eu utilizei duas ferramentas:
* [Docker](https://www.docker.com/).
* [Flyway](https://flywaydb.org/).

### Criando o contêiner
Com o Docker já instalado, execute o seguinte comando para criação do contêiner do banco de dados:
```bash
docker run --name mega_pdv -p 5432:5432 -e POSTGRES_DB=mega_pdv_db -e POSTGRES_PASSWORD=mega_pdv -e POSTGRES_USER=root -d postgres
```

### Execução dos scripts
Com o flyway instalado, execute o seguinte comando para executar os scripts de criação do banco:
```bash
flyway -configFiles=db/config/flyway.conf migrate
```

## Importação
Devesse incluir o diretorio "\opt\softbox\MegaPDV" para realizar a importação. 

## Roles
Podesse utilizar as regras de regex do [Postgresql](https://www.postgresql.org/docs/9.3/static/functions-matching.html) na inclusão de roles.
