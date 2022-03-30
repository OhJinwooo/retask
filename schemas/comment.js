const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,
});
CommentSchema.virtual("commentid").get(function () {
  return this._id.toHexString();
});
CommentSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("comment", CommentSchema);