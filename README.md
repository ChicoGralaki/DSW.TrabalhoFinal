# 🎙️ API - Catálogo de Podcasts e Episódios

## 📖 Sobre o Projeto

Este projeto é uma API RESTful desenvolvida para gerenciar um catálogo de podcasts e episódios. O objetivo é facilitar o cadastro, consulta e gerenciamento de podcasts, bem como de episódios relacionados, contando ainda com autenticação de usuários.

A arquitetura segue uma abordagem modular, separando responsabilidades em diferentes camadas (Controllers, Services, Repositories), o que torna o código mais organizado, limpo e fácil de manter.

---

## ✨ Funcionalidades Principais

### Autenticação de Usuários

- Registro e login de usuários com autenticação via **JWT (JSON Web Token)**.
- Senhas armazenadas de forma segura utilizando **bcryptjs**.
- Proteção de rotas: apenas usuários autenticados podem acessar recursos protegidos.
- Sistema de **recuperação de senha** (lógica implementada no back-end).

### Gerenciamento de Podcasts

- CRUD completo (Criar, Ler, Atualizar, Deletar) para a entidade **Podcast**.

### Gerenciamento de Episódios

- CRUD completo para a entidade **Episódio**.
- Relacionamento 1:N entre Podcasts e Episódios (um podcast pode ter vários episódios).

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript
- **TypeScript** — Superset de JavaScript com tipagem estática
- **Express** — Framework web para APIs REST
- **TypeORM** — ORM para TypeScript/Node.js
- **PostgreSQL** — Banco de dados relacional (driver: `pg`)
- **bcryptjs** — Criptografia de senhas
- **jsonwebtoken** — Geração e validação de tokens JWT
- **dotenv** — Gerenciamento de variáveis de ambiente
- **reflect-metadata** — Suporte para decorators/metadados (necessário para TypeORM)
- **ts-node-dev** — Execução automática em ambiente de desenvolvimento
- **@types/*** — Tipagens para TypeScript

---

## 🚀 Como rodar o projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto conforme o exemplo `.env.example`.

4. **Configure o banco de dados**
   - Ajuste as configurações de acesso ao PostgreSQL no arquivo de configuração do TypeORM.

5. **Rode as migrations (se necessário)**
   ```bash
   npm run typeorm migration:run
   ```

6. **Inicie o servidor**
   ```bash
   npm run dev
   ```
   O servidor ficará disponível em `http://localhost:3000`.

---

## 📚 Exemplos de Uso (Principais Rotas)

- **Cadastro de Usuário:**  
  `POST /auth/register`  
  Body:
  ```json
  { "email": "usuario@email.com", "password": "senha123" }
  ```

- **Login:**  
  `POST /auth/login`  
  Body:
  ```json
  { "email": "usuario@email.com", "password": "senha123" }
  ```

- **Recuperação de Senha:**  
  `POST /auth/forgot-password`  
  Body:
  ```json
  { "email": "usuario@email.com" }
  ```

- **Redefinir Senha:**  
  `POST /auth/reset-password`  
  Body:
  ```json
  { "token": "token_recebido", "newPassword": "novasenha123" }
  ```

- **CRUD Podcasts:**  
  - `POST /podcasts` (criar)
  - `GET /podcasts` (listar)
  - `PUT /podcasts/:id` (atualizar)
  - `DELETE /podcasts/:id` (deletar)

- **CRUD Episódios:**  
  - `POST /episodes` (criar)
  - `GET /episodes` (listar)
  - `PUT /episodes/:id` (atualizar)
  - `DELETE /episodes/:id` (deletar)

---

Desenvolvido como parte da disciplina de Desenvolvimento de Sistemas Web.  
Aluno: João Francisco Gralaki.
