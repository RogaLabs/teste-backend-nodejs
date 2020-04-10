# Teste Backend Nodejs

Seu desafio será desenvolver um serviço de denúncias e, como parte dele, veremos como você estrutura as camadas de aplicação, chamadas externas, variáveis de ambiente, cache, testes unitários, logs e documentação.

### Solução

Implementar uma API REST `[POST] /v1/denuncias` para inserir novas denúncias.

- O serviço de denúncias deverá persistir no banco de dados todos os atributos recebidos no request, juntamente com os dados de endereço originários de uma api externa;
- O serviço de denúncia receberá a geolocalizacão a partir do request e deverá buscar os dados de endereço no seguinte serviço [https://developer.mapquest.com/documentation/geocoding-api/](https://developer.mapquest.com/documentation/geocoding-api/);
- Para saber como utilizar o referido serviço de geolocalização verifique [https://developer.mapquest.com/documentation/](https://developer.mapquest.com/documentation/) e [https://developer.mapquest.com/documentation/geocoding-api/](https://developer.mapquest.com/documentation/geocoding-api/);
- A API REST deverá retornar um erro caso o endereço não seja encontrado no serviço de geolocalização;

### Instalação

`npm install`

### Instruções de uso

Para rodar esta aplicação devemos criar uma arquivo **.env** na raiz do projeto com as seguintes variáveis de ambiente:

API_KEY=**aqui você insere sua api_key do [mapquest](https://developer.mapquest.com/documentation/geocoding-api/)**
PORT=**caso queira usar outra (default:3333)**

### Criando as tabelas do banco de dados

`npx knex migrate:latest`

### Para dar rollback no banco de dados

`npx knex migrate:rollback --all`

mais em: [knex](http://knexjs.org/)

### Rodando o projeto

Dev: `npm run dev`
Prod: `npm start`
Test: não implementado.

### Estrutura

Tentei ao máximo (até onde vai meu conhecimento sobre) estruturar o projeto no padrão MVC.

### SOLID

Refatorei boa parte das funcionalidades na tentativa de me aproximar o máximo possível do conceito SOLID.

### Tecnologias utilizadas

# [checkbox:checked] express

# [checkbox:checked] nodemon

# [checkbox:checked] axios

# [checkbox:checked] dotenv

# [checkbox:checked] knex

# [checkbox:checked] sqlite3

# [checkbox:checked] cors

Fiz dentro das minhas limitações, talvez não seja a melhor solução mas está funcional isso eu garanto.

# That's all folks ;D
