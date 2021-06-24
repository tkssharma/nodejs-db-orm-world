const db = require("../config/dbConfig.js");

// GET ALL USERS
const find = () => {
  return db("users");
};

// GET SPECIFIC USER BY ID
const findById = id => {
  return db("users").where("id", id);
};

// ADD A USER
const addUser = user => {
  return db("users").insert(user, "id");
};

// UPDATE USER
const updateUser = (id, post) => {
  return db("users")
    .where("id", id)
    .update(post);
};

// REMOVE USER
const removeUser = id => {
  return db("users")
    .where("id", id)
    .del();
};

module.exports = {
  find,
  findById,
  addUser,
  updateUser,
  removeUser
};
