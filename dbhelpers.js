const db = require("./data/dbConfig.js");

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
