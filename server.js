const express = require('express');

const server = require('./index');

server.use(express.json());

server.get('/api/users', (req, res) => {
  res.send('hello, hi');
})