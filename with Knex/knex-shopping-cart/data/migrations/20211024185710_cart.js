
exports.up = function (knex) {
  return knex.schema.createTable('cart', function (table) {
    table.increments('id');
    table.integer('user_id').index().references('id').inTable('users')
    table.integer('product_id').index().references('id').inTable('products')
    table.string('inventory');
    table.string('status');
    table.timestamp('created_at').defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').nullable();
    table.timestamp('deleted').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cart');
};