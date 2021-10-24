const knex = require('../db');

async function all() {
  return knex('products');
}

async function get(id) {
  const results = await knex('products').where({ id });
  return results[0]
}

async function remove(id) {
  const results = await knex('products').where({ id }).del()
    .returning('*')
  return results[0]
}

async function create(data) {
  const results = await knex('products')
    .insert(data)
    .returning('*')
  return results[0]
}

module.exports = {
  all,
  get,
  create,
  remove
};