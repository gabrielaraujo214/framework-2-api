# framework-2-api

## Objetivo do projeto

Fazer uma API RESTful sobre gerenciamento de tarefas, com criação de usuário, login e autenticação, e criação, leitura, atualização e remoção de tarefas.

## Tecnologias e bibliotecas utilizadas

- bcrypt
- express
- jsonwebtoken
- sequelize
- sqlite3
- swagger-ui-express
- Docker

## Estrutura de pastas e descrição das responsabilidades de cada componente

- src
  - controllers // diretório com as lógicas de negócio
  - middlewares // diretório com projetos para validação de token
  - models // diretório com as entidades
  - routes // diretório com as rotas
- swagger // diretório com o arquivo do swagger

## Instruções para configurar e executar o projeto

Na pasta raiz do projeto, abra um terminal e rode os comandos:

```
npm init -y

npm i

cd src/

node app.js

```

Para rodar usando Docker, volte para a pasta raiz do projeto e rode os comandos:

```
docker build -t nome-da-imagem -f Dockerfile .

docker run -d -p 3000:3000 --name nome_do_container nome-da-imagem
```
