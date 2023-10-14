# ⬢ Hexagonal Architecture

![NodeJS logo](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma logo](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript Logo](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres logo](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite logo](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Jest logo](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)





> Um projeto para cadastro de empresas, locais e usuários; Onde um usuário possui várias empresas e várias empresas possuem vários locais. Um projeto simples, porém aplicadas grande parte das regras de SOLID, TDD, DRY e arquitetura hexagonal


## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Node

## 🚀 Instalando

Para instalar, siga estas etapas:

Crie um clone do repositório
```
git clone https://github.com/Seiixas/hexagonal-architecture.git
```

Acesse a pasta e instale as dependências:
```bash
cd hexagonal-architecture
yarn
```


Rode as migrations:
```
yarn typeorm:migration:run
yarn prisma:migration:run
```

Caso queira rodar os testes, rode:
 ```
 yarn test
 ``` 

Finalmente, inicie o servidor:
 ```
 yarn nestjs:start:dev
 ``` 

## ☕ Usando o Academic API

Por se tratar de um back-end, não há interface gráfica.

📕 Porém, você pode acessar a documentação da API rodando o projeto e acessando a rota `/api-docs`.

## 📕 Fontes
#### 📄 Artigos:
- [Hexagonal architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Ports-And-Adapters / Hexagonal Architecture](https://www.dossier-andreas.net/software_architecture/ports_and_adapters.html)
- [Ports And Adapters Architecture](http://wiki.c2.com/?PortsAndAdaptersArchitecture)
- [Ports and Adapters Pattern (Hexagonal Architecture)](https://jmgarridopaz.github.io/content/hexagonalarchitecture.html)

#### 📹 Vídeos: 
Otavio Lemos - Clean Architecture
- [45 - Clean Architecture](https://www.youtube.com/watch?v=ONj4zvLtmpA)
- [112 - Clean Architecture com TypeScript & Node.js | ✨ API COMPLETA ✨](https://www.youtube.com/watch?v=7BNoxRntLYo)

Rodrigo Branas
- [Arquitetura Hexagonal na prática. feat. Rodrigo Branas](https://www.youtube.com/watch?v=JufRR4GGkgA)
- [Arquitetura Hexagonal com Nest.js](https://www.youtube.com/watch?v=y4CayhdrSOY)
- [Clean Architecture com Nest.js na prática](https://www.youtube.com/watch?v=ZOyEFaBSEfk)

Outros: 
- [Entenda CLEAN ARCHITECTURE de uma vez por todas! 🧻 | Como DEV ser!](https://www.youtube.com/watch?v=HynTfTli4mw)

#### 👾 Repos: 
- [domain-driven-hexagon](https://github.com/Sairyss/domain-driven-hexagon)
- [clean-architecture-api-boilerplate](https://github.com/luizomf/clean-architecture-api-boilerplate)


