
exports.up = function (knex) {
  return knex.schema.createTable('orders', function (table) {
    table.increments('id');
    table.string('status').index();
    table.integer('user_id').index().references('id').inTable('users')
    table.timestamp('created_at').defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').nullable();
    table.timestamp('deleted').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};