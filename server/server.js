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

app.get('/api', (req, res) => {
  res.send('Hello World');
});

app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.post('/api', (req, res) => {
  console.log(req.body);
  res.status(201).send('Hello World');
});
