const express = require("express");
const port = process.env.PORT || 4000;
const server = express();

const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const dbConnection = require("./data/dbConfig");

const sessionConfig = {
  name: "cookieMaster",
  secret: process.env.SESSION_SECRET || "there can be only one",
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpyOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60000
  })
};

server.use(helmet());
server.use(session(sessionConfig)); // turn on sessions
server.use(cors());

server.listen(port, () => {
  console.log(`Server now listening on ${port}`);
});

module.exports = server;
