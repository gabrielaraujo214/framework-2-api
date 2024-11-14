# docker/Dockerfile

# Usar uma imagem base oficial do Node.js
FROM node:16

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todo o conteúdo da pasta raiz para o diretório de trabalho no container
COPY . .

# Expor a porta em que a aplicação será executada
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "app.js"]
