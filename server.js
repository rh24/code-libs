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
  const SQL =
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
      res.render('pages/libs/show', {
        template: result.rows[0]
      });
    }
  });
});

app.get('/libs/:id/games', (req, res, next) => {
  const SQL = `SELECT * FROM templates JOIN games on templates.id = games.template_id WHERE templates.id = $1;`;
  const values = [req.params.id];

  client.query(SQL, values, (err, result) => {
    if (!result.rows[0]) {
      console.log(err);
      next(err);
    } else {
      console.log(result.rows);
      res.render('pages/games/index', {
        template: result.rows[0],
        games: result.rows
      });
    }
  });
});

app.post('/libs/:id/games', (req, res, next) => {
  let SQL = `INSERT INTO games (username, date_created, template_id, lib_1, lib_2, lib_3, lib_4, lib_5, lib_6, lib_7, lib_8, lib_9, lib_10) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`;
  const values = [
    req.body.username,
    req.body.date_created,
    req.params.id,
    req.body.lib_1,
    req.body.lib_2,
    req.body.lib_3,
    req.body.lib_4,
    req.body.lib_5,
    req.body.lib_6,
    req.body.lib_7,
    req.body.lib_8,
    req.body.lib_9,
    req.body.lib_10,
  ];

  client.query(SQL, values, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    }

    res.redirect(`libs/${req.params.id}/games/${result.rows[0].id}?success=true`);
  });
});

app.get('/libs/:id/games/:game_id', (req, res, next) => {
  const SQL = `SELECT * FROM templates INNER JOIN games ON templates.id = games.template_id WHERE templates.id = $1 AND games.id = $2;`;
  const values = [req.params.id, req.params.game_id];

  client.query(SQL, values, (err, result) => {
    if (!result.rows[0]) {
      console.log(err);
      next(err);
    } else {
      const game = result.rows[0];
      const { title, username, date_created, template_1, template_2, template_3, template_4, template_5, template_6, template_7, template_8, template_9, template_10, template_11, label_1, label_2, label_3, label_4, label_5, label_6, label_7, label_8, label_9, label_10 } = game;

      let ejs = {
        game: result.rows[0],
        success: false,
        title,
        username,
        date_created,
        template_1,
        template_2,
        template_3,
        template_4,
        template_5,
        template_6,
        template_7,
        template_8,
        template_9,
        template_10,
        template_11,
        label_1,
        label_2,
        label_3,
        label_4,
        label_5,
        label_6,
        label_7,
        label_8,
        label_9,
        label_10
      };

      if (req.query.success) ejs.success = true;
      res.render('pages/games/show', ejs);
    }
  });
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