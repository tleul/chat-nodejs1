const router = require("express").Router();
const { database } = require("../db.js");
//**** Sign in user */

router.post("/login", (req, res) => {
  const { userName } = req.body;
  const newUser = {
    id: Math.floor(Math.random() * 234567),
    userName: userName,
  };
  database.users.push(newUser);
  res.send({ userName: userName, id: newUser.id });
});

router.get("/users", (req, res) => {
  res.send({ users: database.users });
});

module.exports = router;
