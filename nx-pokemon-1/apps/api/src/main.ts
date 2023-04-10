import express from 'express';
import cors from 'cors';
import * as path from 'path';

import { pokemon } from './pokemon';

const app = express();
app.use(cors());

var JL = require('jsnlog').JL;
var jsnlog_nodejs = require('jsnlog-nodejs').jsnlog_nodejs;
var bodyParser = require('body-parser');
app.use(bodyParser.json());

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

JL().info('info message!!!!!!!!!Asd!');

// jsnlog.js on the client by default sends log messages to jsnlog.logger, using POST.
// app.post('*.logger', function (req, res) {
app.post('/logger', (req, res) => {
  // Process incoming log messages, by handing to the server side jsnlog.
  // JL is the object that you got at
  // var JL = require('jsnlog').JL;
  jsnlog_nodejs(JL, req.body);

  // Send empty response. This is ok, because client side jsnlog does not use response from server.
  res.send('');
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
