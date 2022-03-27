const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  writer: {
    type: String,
  },
  pw: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  postId: {
    type: Number,
    unique: true,
    required: true,
  }
});

module.exports = mongoose.model("Post", postSchema);