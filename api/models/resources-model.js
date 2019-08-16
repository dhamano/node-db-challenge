const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development);

module.exports = {
  find,
  findById,
  add
}

function find() {
  return db('resources');
}

function findById(id) {
  return db('resources').where({ id });
}

function add(resourcesInfo) {
  return db('resources').insert({ ...resourcesInfo });
}