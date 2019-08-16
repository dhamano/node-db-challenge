
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments();
    tbl.string('project_name', 255)
        .notNullable()
        .unique();
    tbl.string('project_desc', 255);
    tbl.boolean('project_completed')
        .defaultTo(false);
  })
  .createTable('tasks', tbl => {
    tbl.increments();
    tbl.string('task_desc', 255)
        .notNullable();
    tbl.string('task_notes', 255);
    tbl.boolean('task_completed')
        .defaultTo(false);
    tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
  })
  .createTable('resources', tbl => {
    tbl.increments();
    tbl.string('resource_name',255)
        .notNullable()
        .unique();
    tbl.string('resource_desc', 255);
  })
  .createTable('projects_resources', tbl => {
    tbl.increments();
    tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects_resources')
            .dropTableIfExists('resources')
            .dropTableIfExists('tasks')
            .dropTableIfExists('projects')
};
