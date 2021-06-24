
exports.up = function(knex) {
    return knex.schema.createTable('todos', function(table) {
        table.increments('id');
        table.string('title');
        table.integer('order');
        table.boolean('completed').defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('todos');
};