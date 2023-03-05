const router = require("express").Router();
const { database } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const chats = {
  id: "",
  participants: [{ id: "", userName: "", unreadCount: 0 }],
  initiator: "",
  lastMessage: {
    msg: "",
    date: "",
  },
  messages: [
    {
      id: "",
      sender: "",
      message: "",
    },
  ],
};
//********  Create A thread ****************/

router.post("/", (req, res) => {
  const { recipients, from } = req.body;
  const initiator = database.users.find((user) => user.id === from);
  if (recipients.length && from && initiator) {
    const newChat = {
      id: uuidv4(),
      participants: recipients,
      initiator: { ...initiator },
      lastMessage: {
        msg: "",
        date: new Date(),
      },
      messages: [],
    };

    database.chats.push(newChat);
    res.send({ chats: database.chats });
  }
});

//********    Send Message  ****************/
//******** Get A Thread ********************/
//********  Get A message ******************/

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
