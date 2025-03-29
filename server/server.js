import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:5173'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let toDos = [
  {
    id: 1,
    title: 'Buy groceries',
    completed: false,
  },
  {
    id: 2,
    title: 'Do taxes',
    completed: false,
  },
];

app.get('/api/todos', (req, res) => {
  res.status(201).json({ toDos });
});

app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = toDos.find(todo => todo.id === parseInt(id));
  res.status(200).json({ todo });
});

app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  if (!newTodo.title) {
    res.status(400).json({ message: 'Title is required' });
  }
  if (!newTodo.completed) {
    newTodo.completed = false;
  }
  console.log(newTodo);
  toDos.push({ ...newTodo, id: toDos.length + 1 });
  res.status(201).json({ toDos });
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  console.log(id, toDos.length);
  if (!id) {
    res.status(400).json({ message: 'Id is required' });
  } else if (isNaN(id)) {
    res.status(400).json({ message: 'Id is not a number' });
  } else if (id < 0) {
    res.status(400).json({ message: 'Id is negative' });
  } else if (id > toDos.length) {
    res.status(400).json({ message: 'Id is greater than the number of todos' });
  } else {
    res.status(400).json({ message: 'You messed up.' });
  }
  toDos = toDos.filter(todo => todo.id !== parseInt(id));
  res.status(200).json({ toDos });
});

// app.deleteAll('/api/todos', (req, res) => {
//   toDos = [];
//   res.status(200).json({ toDos });
// });
