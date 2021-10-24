const knex = require('../db');

async function get(id) {
  const results = await knex('cart').where({ id });
  return results[0]
}

async function remove(id) {
  const results = await knex('cart').where({ id }).del()
    .returning('*')
  return results[0]
}

async function create(data) {
  const results = await knex('cart')
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