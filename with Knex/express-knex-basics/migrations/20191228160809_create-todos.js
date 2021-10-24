
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('email').index();
        table.string('username');
        table.string('address').defaultTo('');
        table.timestamp('created_at').defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').nullable();
        table.timestamp('deleted').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};