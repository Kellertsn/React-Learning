// controllers/todosController.js
const shortid = require("shortid");
const todoService = require("../service/todoService");



// READ: all
const getTodos = async (req, res) => {
  return todos = await res.json(todoService.getAllTodos());
};

// READ: one by id
const getTodoById = async (req, res) => {
  const { id } = req.params;
  const todo = await todoService.getTodoById(id);
  return res.json(todo);
};

// CREATE
const createTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTodo = await todoService.createTodo({ title, description });

  return res.status(201).json(newTodo);
};

// Update Todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const todoUpdate = await todoService.updateTodo(id, {
    title,
    description,
    completed,
  });
  res.json(todoUpdate);
};

// Delete Todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await todoService.deleteTodo(id);
  res.status(200).json({ message: `Todo with id ${id} deleted successfully` });
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
