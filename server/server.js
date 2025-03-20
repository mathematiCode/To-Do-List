import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api', (req, res) => {
  res.send('Hello World');
});

app.post('/api', (req, res) => {
  console.log(req.body);
  res.status(201).send('Hello World');
});
