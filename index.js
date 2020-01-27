const express = require('express')

const port = process.env.PORT || 4000;

const server = express();

server.listen(port, () => {
  console.log(`Server now listening on ${port}`)
})

module.exports = server;
