'use strict';

const pg = require('pg');
const superagent = require('superagent');
const express = require('express');
const env = require('dotenv').config();
const PORT = process.env.PORT;
const conString = process.env.DATABASE_URL;
const app = express();

const client = new pg.Client(conString);
client.connect();
client.on('error', error => {
  console.log(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/libs', (req, res) => {
  res.render('index');
});

app.get('/libs/:id/games/new', (req, res) => {
  const SQL = `SELECT * FROM templates WHERE id = $1`;
  const values = [req.params.id];

  client.query(SQL, values, (err, result) => {
    if (err) {
      console.log(err);
      res.render('pages/error', { err });
    } else {
      res.render('pages/templates/show', {
        template: result.rows[0]
      });
    }
  });
});

app.get('/libs/:id/games/:id', (req, res) => {

});

app.get('*', (req, res, next) => {
  const err = new Error(`the route ${req.originalUrl} does not exist.`);
  err.statusCode = 404;
  err.shouldRedirect = true;
  // the next() passes the new error object to our middleware error handler
  next(err);
});

app.listen(PORT, () => {
  console.log(`we are listening on port ${PORT}!`);
});

app.use(function (err, req, res, next) {
  console.log(err.message);
  if (!err.statusCode) err.statusCode = 500;

  if (err.shouldRedirect) {
    res.render('pages/error', { err });
  } else {
    res.status(err.statusCode).send(err.message);
  }
});