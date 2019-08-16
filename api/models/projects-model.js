const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development);

module.exports = {
  find,
  findById,
  findTasks,
  add,
  update,
  remove
}

function find() {
  return db('projects');
}

function findById(id) {
  return db('projects').where({ id });
}

function findTasks(id) {
  return db('tasks AS t')
          .innerJoin('projects AS p', 't.project_id', 'p.id')
          .select('t.id', 'p.project_name', 'p.project_desc', 't.task_desc', 't.task_notes', 't.task_completed')
          .where('t.project_id', '=', id);
}

function add(projectInfo) {
  return db('projects').insert({ ...projectInfo });
}

function update(projectInfo, id) {
  return db('projects').where({ id }).update({ ...projectInfo });
}

function remove(id) {
  return db('projects').where({ id }).del();
}