exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', (tbl) => {
    tbl.uuid('uuid').primary();
    tbl.uuid('user_id').index().references('uuid').inTable('user');
    tbl.integer('rating').notNullable();
    tbl.text('comments').nullable();
    tbl.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    tbl.timestamp('modified_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("post");
};


