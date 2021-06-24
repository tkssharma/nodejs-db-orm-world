exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', (tbl) => {
    tbl.uuid('uuid').primary();
    tbl.text('name').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tags");
};
