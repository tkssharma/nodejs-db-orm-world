
exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.increments('id');
    table.string('title');
    table.string('price');
    table.string('inventory');
    table.string('status');
    table.timestamp('created_at').defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').nullable();
    table.timestamp('deleted').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};