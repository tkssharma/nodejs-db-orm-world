exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', (tbl) => {
    tbl.uuid('uuid').primary();
    tbl.text('created_by').nullable().defaultTo('');
    tbl.timestamp('created_at').nullable().defaultTo(knex.raw('now()'));
    tbl.timestamp('modified_at').nullable().defaultTo(knex.raw('now()'));
    tbl.text('name').nullable().defaultTo('');
    tbl.uuid('org_id');
    tbl.boolean('deleted').nullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tag");
};
