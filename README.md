# Desafio Técnico Dasa

## Descrição

Esse é um teste técnico realizado para o processo seletivo da [DASA](https://dasa.com.br) pela WA Project.

## 🌏 Arquitetura

- Os conceitos de desenvolvimento que levei em consideração foram principalmente o Single Responsibility Principle e o Dependency Inversion Principle do [SOLID](https://en.wikipedia.org/wiki/SOLID) para atingir um baixo acoplamento e alta coesão dentre as camadas do sistema.
- Também segui o [Twelve-Factor App](https://12factor.net), que é uma metodologia para construir softwares como serviço e atualmente é o mínimo que você precisa para construir um software minimamente bom.
- Escolhi usar uma arquitetura baseada em camadas, pois assim podemos ter mais flexibilidade com testes e facilidade de manutenção por conta da alta coesão e baixo acoplamento, inspirado na [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), porém com minhas adaptações. Dentre elas as camadas que criei estão:
  - `services`: responsável por fazer a lógica de negócio.
  - `controllers`: responsável por fazer a lógica de apresentação, ao receber requisições, repassar a um serviço e devolver uma resposta.
  - `repositories`: responsável por fazer a lógica de acesso a dados.
  - `entities`: responsável por conter os modelos referentes a lógica de negócio.
  - `dtos`: responsável por conter os objetos que atravessam mais de uma camada e não são entities.
  - `config`: responsável por conter as configurações do sistema.
  - `utils`: responsável por conter funções auxiliares.
  - `database`: responsável por conter as configurações do banco de dados, como migrations.
  - `middlewares`: responsável por conter a lógica reaproveitável entre rotas.

<details>
  <summary>Items do desafio</summary>

## Básico

- [ ] - CRUD de laboratórios
- [ ] - CRUD de exames
- [ ] - Relacionamento de N para N entre laboratório e exames com uso de tabela pivot.
- [ ] - Criação em lote de exames e laboratórios.

## Extra

- [ ] - Possibilidade de executar cadastro, atualização e remoção em lote.
- [ ] - Endpoint que faz a busca por nome do exame e retorna todos os laboratórios associados a esse exame.

## Diferenciais

- [ X ] - Publicação do ambiente em um serviço cloud de hospedagens (Heroku, AWS, GCP, etc)
- [ X ] - Configurar a aplicação para rodar em um container
- [ X ] - Documentação da API

## Além do sugerido

- [ X ] - Padronização de código com o [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/).
- [ X ] - Padronização das mensagens de commit com o conventional-changelog.
- [ X ] - Configuração de git hooks para rodar lint nos arquivos toda vez que é feito um commit.
- [ X ] - Testes unitários com o [Jest](https://jestjs.io/).
- [ ] - Implementação do Twelve-Factor App incluindo Graceful Shutdown, Logging e etc.

</details>

## Requisitos

É necessário ter o [docker](https://docs.docker.com/get-docker/) e o [docker-compose](https://docs.docker.com/compose/install/) instalados na sua máquina.

## 🚀 Como rodar o projeto?

- Copie o arquivo o arquivo `.env` para `.env` e preencha suas variáveis ambientes.
  - Para copiar você pode executar o comando `cp .env.example .env`.
- Rode o comando `npm run start:dev` ou `yarn start:dev` para subir a aplicação em ambiente de Desenvolvimento.

> Se estiver utilizando WSL, verifique o IP do seu WSL para poder colocar como HOST na variável ambiente DATABASE_URL no arquivo `.env`.

Para ter certeza que o projeto está rodando, acesse o endereço `http://localhost:${PORT}/docs` e veja a documentação swagger do projeto.

### Como rodar os testes localmente

Tenha gerado o arquivo `.env` e preenchido as variáveis ambientes como recomendado anteriormente.

Instale as dependências do projeto com o comando `yarn install` e rode o comando `yarn test`.

## ♻️ Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

<p align="center">Feito com ☕ por <strong><a href="https://www.linkedin.com/in/joaobispo2077/">João Bispo</a>😎 </strong> </p>
