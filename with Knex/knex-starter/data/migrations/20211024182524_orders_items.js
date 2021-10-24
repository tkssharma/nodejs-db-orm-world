
exports.up = function (knex) {
  return knex.schema.createTable('product_items', function (table) {
    table.increments('id');
    table.integer('order_id').index().references('id').inTable('orders')
    table.integer('product_id').index().references('id').inTable('products')
    table.timestamp('created_at').defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').nullable();
    table.timestamp('deleted').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('product_items');
};