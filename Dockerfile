# Usar a imagem oficial do Node.js
FROM node:14

# Criar diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos do projeto para dentro do container
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto para dentro do container
COPY . .

# Expor a porta que a API vai escutar
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "start"]
