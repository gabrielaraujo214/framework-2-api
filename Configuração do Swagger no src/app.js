npm install swagger-jsdoc swagger-ui-express


const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes'); // Atualize com o caminho correto para suas rotas

const app = express();
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful',
      version: '1.0.0',
      description: 'Uma API RESTful simples com autenticação JWT',
    },
  },
  apis: ['./src/routes/*.js'], // Defina o caminho para onde suas rotas estão localizadas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Definindo as rotas da API
app.use('/users', userRoutes); // Adapte para as rotas do seu projeto

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
