// app.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Configuração do dotenv para variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Permite que a API entenda requisições com payload JSON
app.use(cors()); // Permite requisições de qualquer origem (ajuste se necessário para segurança)

// Endpoint inicial de teste
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API de Gerenciamento de Tarefas!" });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
