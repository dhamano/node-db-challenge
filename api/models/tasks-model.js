const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}

function find() {
  return db('tasks');
}

function findById(id) {
  return db('tasks').where({ id });
}

function add(taskInfo) {
  return db('tasks').insert({ ...taskInfo });
}

function update(taskInfo, id) {
  return db('tasks').where({ id }).update({ ...taskInfo });
}

function remove(id) {
  return db('tasks').where({ id }).del();
}