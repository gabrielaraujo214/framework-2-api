const jwt = require("jsonwebtoken");

// Middleware para verificar o token JWT
const authenticateJWT = (req, res, next) => {
  // Verificar se o cabeçalho 'Authorization' contém o token
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Remover "Bearer "

  // Se não houver token, retornar erro de não autorizado
  if (!token) {
    return res.status(403).json({ message: "Token não fornecido." });
  }

  // Verificar e decodificar o token usando a chave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido." });
    }

    // Salvar as informações do usuário decodificadas no request
    req.user = user;
    next(); // Continuar com a execução da rota protegida
  });
};

module.exports = authenticateJWT;
