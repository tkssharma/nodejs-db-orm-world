
exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.increments('id');
    table.string('name').index();
    table.string('price');
    table.integer('country_code').index().references('id').inTable('countries');
    // table.integer('merchant_id').index().reference('id').inTable('merchant')
    table.string('status');
    table.timestamp('created_at').defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').nullable();
    table.timestamp('deleted').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};