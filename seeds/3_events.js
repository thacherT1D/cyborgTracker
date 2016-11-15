 /* eslint-disable camelcase, max-len */

'use strict';

exports.seed = function(knex) {
  return knex('events').del()
    .then(() => {
      return knex('events').insert([{
        id: 1,
        user_id: 1,
        task_id: 1,
        event_completed_at: new Date('2016-06-26 14:26:16 UTC'),
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        user_id: 1,
        task_id: 3,
        event_completed_at: new Date('2016-06-26 14:26:16 UTC'),
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 3,
        user_id: 2,
        task_id: 2,
        event_completed_at: new Date('2016-06-26 14:26:16 UTC'),
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));"
      );
    });
};
