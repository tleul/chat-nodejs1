const router = require("express").Router();
const { database } = require("../db.js");
const { uuid } = require("uuid");
//********  Create A thread ****************/
//********    Send Message  ****************/
//******** Get A Thread ********************/
//********  Get A message ******************/

const chats = {
  id: "",
  participants: [{ id: "", userName: "", unreadCount: 0 }],
  messages: [
    {
      id: "",
      sender: "",
      message: "",
    },
  ],
};
router.get("/chat", (req, res) => {
  const chats = database.chats;
  res.send({ chats: chats });
});
router.get("/chat/:id", (req, res) => {
  const chats = database.chats.find((chat) => {
    chat.id === req.params.id;
  });
  res.send({ chats: chats });
});
module.exports = router;
