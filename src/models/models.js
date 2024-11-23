const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
});

// Definir o relacionamento sem duplicar a chave estrangeira
User.hasMany(Task, {
  foreignKey: 'userId', // define explicitamente o nome da chave estrangeira
  onDelete: 'CASCADE'   // opcional: quando o usuário for deletado, as tarefas associadas também serão deletadas
});
Task.belongsTo(User, {
  foreignKey: 'userId', // define explicitamente o nome da chave estrangeira
});

module.exports = { sequelize, User, Task };
