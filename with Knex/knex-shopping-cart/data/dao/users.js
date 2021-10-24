const knex = require('../db');

async function all() {
  return knex('users');
}

async function get(id) {
  const results = await knex('users').where({ id });
  return results[0]
}
async function getByEmail(email) {
  const results = await knex('users').where({ email });
  return results[0]
}
async function getByEmailAndPassword(email, password) {
  const results = await knex('users').where({ email, password });
  return results[0]
}

async function remove(id) {
  const results = await knex('users').where({ id }).del()
    .returning('*')
  return results[0]
}

async function create(data) {
  const results = await knex('users')
    .insert(data)
    .returning('*')
  return results[0]
}

module.exports = {
  all,
  get,
  create,
  remove,
  getByEmail,
  getByEmailAndPassword
};