const express = require("express");

const server = require("./index");

const db = require("./dbhelpers");

const auth = require("./auth/auth-mw");

server.use(express.json());

server.get("/api/users", auth.restricted, (req, res) => {
  db.findUsers()
    .then(users => {
      console.log("these are users", users);
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: "the server encountered an issue retrieving users" });
    });
});

server.post("/api/register", auth.hashPass, (req, res) => {
  db.registerUser(req.body)
    .then(newUser => {
      res.status(201).json({ message: `You're registered!` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "the server encountered an issue creating a new user"
      });
    });
});

server.post("/api/login", auth.authenticate, (req, res) => {
  res.status(200).json({ message: "Logged In" });
});

server.get("/api/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({
          you: "get the heck off my lawn"
        });
      } else {
        res
          .status(200)
          .json({ goodbye: "and thank you for coming to my lawn" });
      }
    });
  } else {
    res.status(204);
  }
});
