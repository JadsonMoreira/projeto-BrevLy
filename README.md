# 🔗 BrevLy

> Encurtador de URLs moderno, rápido e intuitivo com contagem de acessos, sincronização entre abas em tempo real e exportação de relatórios em CSV.

---

## 💻 Sobre o Projeto

O **BrevLy** é uma aplicação Fullstack desenvolvida como projeto prático para a **Pós-graduação da Faculdade de Tecnologia Rocketseat (FTR)**. 

O objetivo do projeto é fornecer uma plataforma moderna e eficiente para encurtamento e gerenciamento de links, permitindo criar URLs encurtadas personalizadas, monitorar a quantidade de cliques/acessos em tempo real, gerenciar as URLs cadastradas e exportar relatórios diretamente em formato CSV integrado ao Cloudflare R2.

---

## 🚀 Funcionalidades

- **Encurtamento Inteligente:** Permite encurtar qualquer URL válida com validação imediata.
- **Redirecionamento & Contagem de Acessos:** Contabiliza o número de acessos automaticamente antes de redirecionar para a URL de destino.
- **Página de Erro 404 (URL Inexistente):** Interface amigável caso o link encurtado não exista ou tenha sido deletado.
- **Listagem & Gerenciamento:** Visualização detalhada das URLs cadastradas com opção de exclusão e cópia rápida para a área de transferência.
- **Sincronização em Tempo Real:** Atualização automática entre diferentes abas do navegador via `BroadcastChannel` (ao cadastrar ou excluir um link em uma aba, as outras refletem instantaneamente).
- **Exportação para CSV:** Geração e upload assíncrono do relatório de URLs para bucket Cloudflare R2 com download direto no navegador.
- **Documentação Interativa da API:** Swagger/OpenAPI integrado para testes e inspeção de rotas.

---

## 🛠️ Tecnologias Utilizadas

### **Backend (`/server`)**
- **Node.js** & **TypeScript**
- **Fastify:** Framework web de alta performance.
- **Drizzle ORM:** Manipulação e migrações tipadas do banco de dados.
- **PostgreSQL:** Banco de dados relacional.
- **Zod & Fastify Type Provider Zod:** Validação de schemas e validação estrita de tipos nas rotas.
- **Cloudflare R2 (@aws-sdk/client-s3):** Armazenamento em nuvem de arquivos CSV exportados.
- **Swagger UI:** Documentação interativa em `/docs`.
- **Biome:** Linter e formatador de código ultrarrápido.

### **Frontend (`/web`)**
- **React 19** & **TypeScript**
- **Vite:** Build tool e servidor de desenvolvimento ágil.
- **Tailwind CSS v4:** Estilização moderna e utilitária.
- **React Hook Form + Zod Resolvers:** Gerenciamento e validação de formulários.
- **React Router DOM v7:** Roteamento do SPA.
- **Phosphor Icons:** Biblioteca de ícones.
- **Sonner:** Notificações toast interativas.
- **Axios:** Cliente HTTP para comunicação com a API.

---

## 📂 Estrutura do Projeto

```bash
BrevLy/
├── server/               # Backend (Fastify + Drizzle ORM)
│   ├── src/
│   │   ├── db/          # Configurações do Drizzle e schemas Postgres
│   │   ├── routes/      # Definição das rotas HTTP e schemas Zod
│   │   ├── services/    # Regras de negócio da aplicação
│   │   ├── app.ts       # Configuração dos plugins, CORS e rotas do Fastify
│   │   └── env.ts       # Validação das variáveis de ambiente
│   ├── docker-compose.yml
│   └── package.json
│
├── web/                  # Frontend (React + Vite + Tailwind)
│   ├── src/
│   │   ├── api/         # Chamadas HTTP com Axios
│   │   ├── assets/      # Ícones e ilustrações SVG
│   │   ├── components/  # Componentes da interface (formulários, cards, listagem)
│   │   ├── pages/       # Páginas da aplicação (Home, Redirect, NotFound)
│   │   ├── utils/       # Funções utilitárias
│   │   ├── app.tsx      # Definição e configuração das rotas (React Router)
│   │   └── main.tsx     # Ponto de entrada da aplicação React
│   └── package.json
```

---

## ⚙️ Pré-requisitos

Antes de iniciar, você precisará ter instalado:
- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose (para o PostgreSQL)
- Gerenciador de pacotes `npm`, `pnpm` ou `yarn`

---

## 🔧 Configuração e Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/JadsonMoreira/projeto-BrevLy.git
cd projeto-BrevLy
```

---

### 2. Configurando o Backend (`/server`)

1. Acesse o diretório do servidor:
   ```bash
   cd server
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo `.env` na raiz da pasta `server/`:
   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL="postgresql://docker:docker@localhost:5432/brevly"

   # Cloudflare R2 (para exportação CSV)
   CLOUDFLARE_ACCOUNT_ID="seu_account_id"
   CLOUDFLARE_ACCESS_KEY_ID="sua_access_key"
   CLOUDFLARE_SECRET_ACCESS_KEY="sua_secret_key"
   CLOUDFLARE_BUCKET="nome_do_bucket"
   CLOUDFLARE_PUBLIC_URL="https://pub-seu-bucket.r2.dev"
   ```

4. Suba o banco de dados via Docker:
   ```bash
   docker compose up -d
   ```

5. Execute as migrações do banco:
   ```bash
   npm run db:migrate
   ```

6. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   > O servidor iniciará em `http://localhost:3000` e a documentação estará acessível em `http://localhost:3000/docs`.

---

### 3. Configurando o Frontend (`/web`)

1. Em outro terminal, acesse o diretório web:
   ```bash
   cd web
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo `.env` na pasta `web/`:
   ```env
   VITE_FRONTEND_URL=http://localhost:5173
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. Inicie o frontend:
   ```bash
   npm run dev
   ```
   > Acesse a aplicação no navegador em: `http://localhost:5173`

---

## 📖 Rotas da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/links` | Cria uma nova URL encurtada |
| `GET` | `/links` | Lista todas as URLs cadastradas |
| `DELETE` | `/links/:id` | Remove uma URL encurtada |
| `GET` | `/links/:shortUrl` | Retorna a URL original correspondente ao código encurtado |
| `PATCH` | `/links/:id/access` | Incrementa o número de acessos da URL |
| `GET` | `/links/export` | Gera o CSV com as URLs, envia ao R2 e retorna o link de download |
| `GET` | `/docs` | Interface do Swagger com a documentação interativa |

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

Feito com 💜 por **Jadson Moreira** para a **Pós-graduação da Faculdade de Tecnologia Rocketseat**.