const mongoose = require("mongoose");
const Message = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", Message);
