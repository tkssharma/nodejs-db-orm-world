exports.up = knex =>
  knex.schema.createTable("todo", tbl => {
    tbl.increments();
    tbl.text("task").notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists("todo");