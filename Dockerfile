# Etapa 1: Usar uma imagem Node.js base
FROM node:16 AS build

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos necessários para o container
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta usada pelo servidor de desenvolvimento do Vue CLI
EXPOSE 8080

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "serve"]
