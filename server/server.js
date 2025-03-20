import express from 'express';

const app = express();

app.use(express.json());

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});

app.get('/api', (req, res) => {
  res.send('Hello World');
});

app.post('/api', (req, res) => {
  console.log(req.body);
  res.status(201).send('Hello World');
});
