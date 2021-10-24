
exports.up = function (knex) {

};

exports.down = function (knex) {

};

exports.up = function (knex) {
  return knex.schema.table('users', function (table) {
    table.unique(['email'])
  });
};

exports.down = function (knex) {
  return Promise.resolve()
};