const bcrypt = require("bcryptjs");

const db = require("./dbhelpers");

module.exports = {
  authenticate,
  hashPass
};

function authenticate(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    db.findUsers(username)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "go away, unauthed person" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "something went wrong during login" });
      });
  } else {
    res
      .status(400)
      .json({ message: "please provide both username and password" });
  }
}

function hashPass(req, res, next) {
  const credentials = req.body;

  if (credentials.username && credentials.password) {
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
  } else {
    res
      .status(400)
      .json({ message: "please provide both username and password" });
  }

  next();
}
