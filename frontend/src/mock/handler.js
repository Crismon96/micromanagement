import { rest } from 'msw';

const todos = [
  { id: 1, text: 'Learn Svelte', completed: false },
  { id: 2, text: 'Create a Todo List', completed: true },
  { id: 3, text: 'Use Mock Service Worker', completed: false },
];

// Retrieve todos
const getTodos = rest.get('/api/todos', (req, res, ctx) => {
  return res(ctx.json(todos));
});

// Create a new todo
const createTodo = rest.post('/api/todos', (req, res, ctx) => {
  const newTodo = { id: Date.now(), completed: false, date: new Date(), text: req.body.text };
  todos.push(newTodo);
  return res(ctx.json(newTodo), ctx.status(201));
});

// Delete a todo
const deleteTodo = rest.delete('/api/todos/:id', (req, res, ctx) => {
  const todoId = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    todos.splice(index, 1);
  }
  return res(ctx.status(204));
});

// Complete a todo
const completeTodo = rest.patch('/api/todos/:id', (req, res, ctx) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
  }
  return res(ctx.json(todo), ctx.status(200));
});

export const handlers = [getTodos, createTodo, deleteTodo, completeTodo];
