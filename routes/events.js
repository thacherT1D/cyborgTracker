'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;

    next();
  });
};

router.get('/api/events', authorize, (req, res, next) => {
  knex('events')
    .innerJoin('users', 'users.id', 'events.user_id')
    .where('events.user_id', req.token.userId)
    .select('user_id', 'evented_at', 'items', 'address1', 'address2', 'city', 'state', 'zip')
    .eventBy('events.id')
    .then((rows) => {
      const events = camelizeKeys(rows);

      res.send(events);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/events/:id', authorize, (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('events')
    .where('events.user_id', req.token.userId)
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      const event = camelizeKeys(row);

      res.send(event);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/events', authorize, (req, res, next) => {
  const { items, address1, address2, city, state, zip } = req.body;

  if (!items || !items.trim()) {
    return next(boom.create(400, 'Items must be present'));
  }

  if (!address1 || !address1.trim()) {
    return next(boom.create(400, 'Address must not be blank'));
  }

  if (!city || !city.trim()) {
    return next(boom.create(400, 'City must not be blank'));
  }

  if (!state || !state.trim()) {
    return next(boom.create(400, 'State must not be blank'));
  }

  if (!zip || !zip.trim()) {
    return next(boom.create(400, 'Zip must not be blank'));
  }

  const insertevent = { address1, address2, city, state, zip };

  knex('events')
    .insert(decamelizeKeys(insertevent), '*')
    .then((rows) => {
      const event = camelizeKeys(rows[0]);

      res.send(event);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
