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
      date: "",
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
      participants: database.users.filter((user) =>
        recipients.find(
          (recipient) => recipient.value.toString() === user.id.toString()
        )
      ),
      initiator: { ...initiator },
      lastMessage: {
        msg: "",
        date: new Date(),
      },
      messages: [],
    };

    database.chats.push(newChat);
    res.send({
      chats: database.chats.map(
        ({ lastMessage, id, participants, initiator }) => {
          return {
            lastMessage,
            id,
            participants,
            initiator,
          };
        }
      ),
    });
  }
});

//********    Send Message  ****************/
//******** Get A Thread ********************/
//********  Get A message ******************/

router.get("/", (req, res) => {
  const chats = database.chats;
  res.send({
    chats: chats.map(({ lastMessage, id, participants, initiator }) => {
      return {
        lastMessage,
        id,
        participants,
        initiator,
      };
    }),
  });
});
router.get("/:id", (req, res) => {
  const chat = database.chats.find((chat) => {
    return chat.id === req.params.id;
  });
  if (chat) {
    res.send({ messages: chat.messages });
  } else {
    res.send({ messages: [] });
  }
});
module.exports = router;
