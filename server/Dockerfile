# Etapa 1: Build da aplicação TypeScript
FROM node:24-alpine AS builder

WORKDIR /app

# Copia os manifestos de dependências e configs
COPY package*.json tsconfig.json tsup.config.ts ./

# Instala todas as dependências (incluindo devDependencies para compilar)
RUN npm install

# Copia o código fonte
COPY src ./src

# Executa o script de build configurado no package.json (tsup)
RUN npm run build

# Etapa 2: Imagem final leve para Produção
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia os arquivos de pacotes
COPY package*.json ./

# Instala apenas as dependências necessárias para produção
RUN npm install --omit=dev

# Copia o código compilado da etapa anterior
COPY --from=builder /app/dist ./dist

# Roda com usuário não-root por segurança
USER node

EXPOSE 3000

CMD ["node", "dist/app.js"]
