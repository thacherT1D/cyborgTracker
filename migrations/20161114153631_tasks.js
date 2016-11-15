'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments();
    table.string('task_name').notNullable().defaultTo('');
    table.string('task_notes').notNullable().defaultTo('');
    table.integer('completed').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
