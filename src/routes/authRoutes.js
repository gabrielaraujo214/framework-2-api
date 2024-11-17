const express = require("express");
const {
  register,
  login,
  authenticate,
} = require("../controllers/authController");

const router = express.Router();

// Rota de registro
router.post("/register", register);

// Rota de login
router.post("/login", login);

// Exemplo de rota protegida (requer autenticação)
router.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Rota protegida acessada com sucesso", user: req.user });
});

module.exports = router;
