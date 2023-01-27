import express from 'express';
import cors from 'cors';
import * as path from 'path';

import { pokemon } from './pokemon';

const app = express();
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to Rod!' });
});

app.get('/pokemon', (_, res) => {
  res.send(pokemon);
});

app.get('/search', (req, res) => {
  const q = ((req.query.q as string) ?? '').toLowerCase();
  res.send(
    pokemon.filter(({ name: { english } }) => english.toLowerCase().includes(q))
  );
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
