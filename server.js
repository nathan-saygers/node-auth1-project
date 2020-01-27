const express = require('express');

const server = require('./index');

const db = require('./dbhelpers');

server.use(express.json());

server.get('/api/users', (req, res) => {
  db.findUsers()
    .then(users => {
      console.log('these are users', users)
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'the server encountered an issue retrieving users' })
    })
})

server.post('/api/register', (req, res) => {
  db.registerUser(req.body)
    .then(newUser => {
      res.status(201).json({ message: `You're registered!` })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'the server encountered an issue creating a new user'})
    })
})

server.post('/api/login', (req, res) => {
  
  res.status(200).json({ message: 'Logged In' })
})