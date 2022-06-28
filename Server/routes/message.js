const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Message = require("../models/message");

//select all messages
router.get("/", (req, res) => {
  Message.find({}, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});
//insert a message
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.userId) {
      const newMessage = new Message({
        userId: req.body.userId,
        message: req.body.message,
      });
      const cmessage = await newMessage.save();
      res.status(200).json(cmessage);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
