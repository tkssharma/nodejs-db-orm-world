exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.uuid('uuid').primary();
    tbl.string("name");
    tbl.text('email').unique().nullable().defaultTo('');
    tbl.text('first_name').nullable().defaultTo('');
    tbl.text('last_name').nullable().defaultTo('');
    tbl.text('title').nullable().defaultTo('');
    tbl.text('role').nullable().defaultTo('');
    tbl.text('linkedin_url').nullable().defaultTo('');
    tbl.boolean('deleted').nullable().defaultTo(false);
    tbl.boolean('blocked').nullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
