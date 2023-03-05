const router = require("express").Router();
const { database } = require("../db.js");
//**** Sign in user */

router.post("/login", (req, res) => {
  const { userName, avatar } = req.body;

  if (userName && userName.length > 0) {
    const foundUser = database.users.find(
      (user) => user.userName.toString() === userName.toString()
    );
    if (foundUser) {
      return res.status(400).send({ msg: " User Already Exist " });
    }
    const newUser = {
      id: Math.floor(Math.random() * 234567).toString(),
      userName: userName,
      avatar: avatar,
    };
    database.users.push(newUser);
    res.send({ userName: userName, id: newUser.id, avatar: avatar });
  } else {
    return res.status(400).send({ msg: "User Information not Satisfied" });
  }
});

router.get("/users", (req, res) => {
  res.send({ users: database.users });
});
router.post("/validate", (req, res) => {
  const foundUser = database.users.find(
    (user) => user.id.toString() === req.body.id.toString()
  );

  if (foundUser) {
    return res.send({
      userName: foundUser.userName,
      id: foundUser.id,
      avatar: foundUser.avatar,
    });
  }
  return res.status(400).send({ msg: "Unauthorized" });
});

module.exports = router;
