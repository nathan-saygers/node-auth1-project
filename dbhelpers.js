// knex config
const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
const knex = require('knex')
const db = knex(config);

module.exports = {
  findUsers,
  registerUser
}

const findUsers = function(username) {
  if(username) {
    return db('users').where({username})
  } else {
    return db.select('username').from('users')
  }
}

const registerUser = function(userData) {
  return db('users').insert(userData);
}
