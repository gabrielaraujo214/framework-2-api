const { Task } = require("../models/models");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ message: "Task not found" });
  }
  await task.destroy();
  res.status(204).end();
};
