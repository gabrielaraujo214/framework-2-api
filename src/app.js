const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models/models");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger.json");

// Rotas
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Configurações iniciais
const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o banco de dados
sequelize
  .sync()
  .then(() => console.log("Banco de dados conectado com sucesso."))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

// Rotas principais
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Documentação Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota padrão
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API de gerenciamento de tarefas!" });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Ocorreu um erro no servidor." });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(
    `Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`
  );
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/docs`);
});
