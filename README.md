# Access Ton Service

## Descrição

Desafio back-end proposto pela Stone

## Requisítos
- Node >=18

## Rodando ambiente de desenvolvimento

Primeiramente, instalar os pacotes de dependêcias:
```bash
$ npm install
```

Instalação do banco de dados DynamoDB local:
```bash
$ npm run setup:dynamodb
```

Executar o projeto em modo de desenvolvimento em watch mode:
```bash
$ npm run start:dev
```

## Execução dos testes unitários

```bash
$ npm run test
```

## Swagger e Postman 📚
Com a aplicação rodando, a rota `http://localhost:3000/swagger` estará disponível como documentação Swagger de todos os endpoints.

Além disso, na raiz do projeto encontra-se uma collection do Postman `Access-Ton-Service.postman_collection.json`, que pode ser importada com requisições de todos os endpoints do projeto.

## Endpoints

#### Consultar número de acessos | get-access-counter
`GET /count`

#### Incrementar número de acessos | add-access-counter
`PUT /count`

#### Criar usuário | create-user
`POST /user`

#### Consultar usuário | get-user
`GET /count`

#### Verificar status do serviço | health-check
`GET /count`

## Tecnologias utilizadas  💻
- TypeScript
- AWS DynamoDB
- AWS API Gateway
- AWS Lambda Functions
- Serverless Framework
