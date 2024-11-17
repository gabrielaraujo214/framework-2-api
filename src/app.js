// Importação das bibliotecas
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const dotenv = require("dotenv");

// Configuração do dotenv para variáveis de ambiente
dotenv.config();

// Criação do app Express
const app = express();

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Conexão com o banco de dados MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro de conexão com o MongoDB:", err));

// Middleware
app.use(express.json()); // Permite que a API entenda requisições com payload JSON
app.use(bodyParser.json()); // Middleware adicional para parsing de JSON
app.use(cors()); // Permite requisições de qualquer origem

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API RESTful",
      version: "1.0.0",
      description:
        "API para gerenciamento de usuários e tarefas, com autenticação JWT",
    },
  },
  apis: ["./routes/*.js"], // Caminho para os arquivos de rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Importação das rotas
const taskRouter = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Endpoints e Rotas
app.use("/api/auth", authRoutes); // Rotas de autenticação
app.use("/users", userRoutes); // Rotas de usuários
app.use(taskRouter); // Rotas de tarefas

// Endpoint inicial de teste
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API de Gerenciamento de Tarefas!" });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
