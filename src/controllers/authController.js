const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const SECRET_KEY = process.env.JWT_SECRET_KEY || "secretkey"; // chave secreta do JWT

// Função de registro
async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  const existingUser = userModel.findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = userModel.createUser(email, passwordHash);

  res.status(201).json({
    message: "Usuário registrado com sucesso",
    user: { email: newUser.email },
  });
}

// Função de login
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  const user = userModel.findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  // Gerar o token JWT
  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "Login bem-sucedido", token });
}

// Função de verificação de token
function authenticate(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { register, login, authenticate };
