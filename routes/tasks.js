'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/api/tasks', (_req, res, next) => {
  knex('tasks')
    .orderBy('name')
    .then((rows) => {
      const tasks = camelizeKeys(rows);

      res.send(tasks);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/tasks/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('tasks')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      const task = camelizeKeys(row);

      res.send(task);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
