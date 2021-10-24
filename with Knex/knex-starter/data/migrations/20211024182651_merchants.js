
exports.up = function (knex) {
  return knex.schema.createTable('merchants', function (table) {
    table.increments('id');
    table.string('merchant_name');
    table.integer('country_code').index().references('id').inTable('countries')
    table.integer('admin_id').index().references('id').inTable('users')
    table.timestamp('created_at').defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').nullable();
    table.timestamp('deleted').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('merchants');
};