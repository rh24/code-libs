'use strict';

let ejs = require('ejs');
const pg = require('pg');
// const superagent = require('superagent');
const express = require('express');
const env = require('dotenv').config();
const PORT = process.env.PORT;
const conString = process.env.DATABASE_URL;
const app = express();
const methodOverride = require('method-override');

const client = new pg.Client(conString);
client.connect();
client.on('error', error => {
  console.log(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  client.query('SELECT id FROM stretch_templates', (err, result) => {
    if (err) {
      next(err);
    } else {
      const allTemplates = result.rows.map(obj => obj.id);
      let rand = allTemplates[Math.floor(Math.random() * allTemplates.length)];
      res.redirect(`/libs/${rand}/games/new`);
    }
  });
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/libs', (req, res) => {
  const SQL = `SELECT * FROM stretch_templates;`;

  client.query(SQL, (err, result, next) => {
    if (err) {
      next(err);
    } else {
      const templatesArr = result.rows.map(dataSet => ({ title: dataSet.title, author: dataSet.author, id: dataSet.id }));

      res.render('pages/libs/index', { templates: templatesArr });
    }
  });
});

app.get('/games', (req, res, next) => {
  const SQL = `SELECT * FROM stretch_templates JOIN stretch_games ON stretch_games.stretch_template_id = stretch_templates.id;`;

  client.query(SQL, (err, result) => {
    if (err) {
      next(err);
    } else if (result.rows.length) {
      // map to compiled ejs template
      const games = result.rows.map(dataSet => {
        let gameObj = {};
        let libs = {};

        for (let prop in dataSet) {
          if (prop.includes('lib')) libs[prop] = dataSet[prop];
        }

        const body = ejs.render(dataSet.template_body, libs);

        gameObj.body = body;
        gameObj.title = dataSet.title;
        gameObj.username = dataSet.username;
        gameObj.date_created = dataSet.date_created;
        gameObj.stretch_template_id = dataSet.stretch_template_id;
        gameObj.id = dataSet.id;

        return gameObj;
      });
      res.render('pages/games/index', { games, noGames: false, allGamesRoute: true });
    } else {
      res.render('pages/games/index', { noGames: true, title: null });
    }
  });
});

//displaying form for user inputs into template
app.get('/libs/:id/games/new', (req, res, next) => {
  const SQL = 'SELECT * FROM stretch_templates WHERE id = $1';
  const values = [req.params.id];
  client.query(SQL, values, (err, result) => {
    if (!result.rows[0]) {
      next(err);
    } else {
      res.render('pages/games/new', {
        template: result.rows[0]
      });
    }
  });
});

app.get('/libs/:id/games', (req, res, next) => {
  // check if libs/:id is in the db
  const checkDb = `SELECT * FROM stretch_templates WHERE id = $1;`;
  const id = [req.params.id];

  client.query(checkDb, id, (err, result) => {
    if (result.rows.length) {
      // if template exists, but no games presently played, render partial and trigger below function
      renderGamesIndex(req, res, next, result);
    } else {
      next(err);
    }
  });
});

function renderGamesIndex(req, res, next, result) {
  const SQL = `SELECT * FROM stretch_templates JOIN stretch_games on stretch_templates.id = stretch_games.stretch_template_id WHERE stretch_templates.id = $1;`;
  const values = [req.params.id];
  let { title, id } = result.rows[0];

  client.query(SQL, values, (err, result) => {
    if (err) {
      next(err);
    } else if (result.rows.length) {
      // map to rendered ejs template
      const games = result.rows.map(dataSet => {
        let gameObj = {};
        let libs = {};

        for (let prop in dataSet) {
          if (prop.includes('lib')) libs[prop] = dataSet[prop];
        }

        const body = ejs.render(dataSet.template_body, libs);

        gameObj.body = body;
        gameObj.title = dataSet.title;
        gameObj.username = dataSet.username;
        gameObj.date_created = dataSet.date_created;
        gameObj.stretch_template_id = dataSet.stretch_template_id;
        gameObj.id = dataSet.id;

        return gameObj;
      });

      res.render('pages/games/index', { games, title, noGames: false, allGamesRoute: false });
    } else {
      res.render('pages/games/index', { title, id, noGames: true });
    }
  });
}

//entering inputs from form into database and returning id to display filled out template.
app.post('/libs/:id/games', (req, res, next) => {
  let SQL = `INSERT INTO stretch_games (username, date_created, stretch_template_id, lib_1, lib_2, lib_3, lib_4, lib_5, lib_6, lib_7, lib_8, lib_9, lib_10) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id;`;
  let rightNow = new Date().toDateString();
  const values = [
    req.body.username,
    rightNow,
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
      next(err);
    }

    res.redirect(`/libs/${req.params.id}/games/${result.rows[0].id}?success=true`);
  });
});

app.get('/libs/:id/games/:game_id', (req, res, next) => {
  const SQL = `SELECT * FROM stretch_templates INNER JOIN stretch_games ON stretch_templates.id = stretch_games.stretch_template_id WHERE stretch_templates.id = $1 AND stretch_games.id = $2;`;
  const values = [req.params.id, req.params.game_id];

  client.query(SQL, values, (err, result) => {
    if (!result.rows) {
      next(err);
    } else {
      const game = result.rows[0];
      const { lib_1, lib_2, lib_3, lib_4, lib_5, lib_6, lib_7, lib_8, lib_9, lib_10, title, username, date_created } = game;
      const words = { lib_1, lib_2, lib_3, lib_4, lib_5, lib_6, lib_7, lib_8, lib_9, lib_10, title, username, date_created };

      const story = ejs.render(result.rows[0].template_body, words);
      let ejsObj = { story, title, username, date_created, success: false, template_id: req.params.id, game_id: req.params.game_id };
      if (req.query.success) ejsObj.success = true;
      res.render('pages/games/show', ejsObj);
    }
  });
});

app.delete('/libs/:id/games/:game_id', (req, res, next) => {
  const SQL = 'DELETE FROM stretch_games WHERE stretch_games.id = $1';
  const values = [req.params.game_id];

  client.query(SQL, values, (err) => {
    if (err) {
      next(err);
    } else {
      res.redirect(`/libs/${req.params.id}/games?success=true`);
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

app.use(function (err, req, res) {
  console.log(err.message);
  console.log(err);
  if (!err.statusCode) err.statusCode = 500;

  if (err.shouldRedirect) {
    res.render('pages/error', { err });
  } else {
    res.status(err.statusCode).send(err.message);
  }
});
