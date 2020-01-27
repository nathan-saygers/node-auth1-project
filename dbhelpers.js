// knex config
const environment = process.env.ENVIRONMENT || "development";
const config = require("./knexfile.js")[environment];
const knex = require("knex");
const db = knex(config);

module.exports = {
  findUsers,
  registerUser
};

function findUsers(username) {
  if (username) {
    return db("users")
      .where({ username: username })
      .first();
  } else {
    return db.select("username").from("users");
  }
}

function registerUser(userData) {
  return db("users").insert(userData);
}
