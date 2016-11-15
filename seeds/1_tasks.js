/* eslint-disable camelcase, max-len */

'use strict';

exports.seed = function(knex) {
  return knex('tasks').del()
    .then(() => {
      return knex('tasks').insert(
        [{
                id: 1,
                task_name: 'New OmniPod',
                task_notes: 'New Pod!',
                completed: 0
              },
              {
                id: 2,
                task_name: 'Restart Dexcom',
                task_notes: 'Restarted not replaced',
                completed: 0
              },
              {
                id: 3,
                task_name: 'New PDM Batteries',
                task_notes: '',
                completed: 0
              },
              {
                id: 4,
                task_name: 'New Dexcom Sensor',
                task_notes: 'replaced sensor',
                completed: 0
              },
              {
                id: 5,
                task_name: 'Charged Dexcom',
                task_notes: '',
                completed: 0
              },
              {
                id: 6,
                task_name: 'Changed Lancet',
                task_notes: '',
                completed: 0
              }]
    );
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks));"
      );
    });
};
