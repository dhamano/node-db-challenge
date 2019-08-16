const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development);

module.exports = {
  find,
  findById,
  add
}

function find(id) {
  return db('tasks AS t')
          .innerJoin('projects AS p', 't.project_id', 'p.id')
          .select('t.id', 'p.project_name', 'p.project_desc', 't.task_desc', 't.task_notes', 't.task_completed')
          .where('t.project_id', '=', id);
}

function findById(id) {
  return db('tasks').where({ id });
}

function add(taskInfo) {
  return db('tasks').insert({ ...taskInfo });
}