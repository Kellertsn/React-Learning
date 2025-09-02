// services/todosService.js
const shortid = require("shortid");

const getAllTodos = async () => {
  return todos;
}

/** Query */
async function listTodos() {
  return todos;
}

async function getTodoById(id) {
  return todos.find((t) => t.id === id) || null;
}

/** Mutations */
async function createTodo({ title, description = "" }) {
  const newTodo = {
    id: shortid.generate(),
    title,
    description,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
}

function updateTodo(id, patch = {}) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;

  const { title, description, completed } = patch;
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  return todo;
}

function deleteTodo(id) {
  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);
  return todos.length !== before; // true if deleted
}

/** (Optional) helpers for tests/dev */
function resetTodos(seed = []) {
  todos = Array.isArray(seed) ? [...seed] : [];
}

module.exports = {
  listTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  resetTodos, // optional
};