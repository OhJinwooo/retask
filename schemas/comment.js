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




//코멘트가 저장되는 데이터 타입이 3가지인데, 1가지만 정의되어있네요! 
//여기서는 몽고디비에 저장할 때 데이터를 어떻게 저장할거다~~하는 명세서를 작성해준다고 생각하면되요! (데이터 타입, 필수값인지 아닌지 등)
//comment도 타입지정과 필수여부도 함께 써줘야하고, postId, userId도 추가하면 좋을것 같아요! 아래 코드를 참고해주세요
//그리고 진우님은 commentid로 this_id를 쓰셨는뎅.. 저는 그냥 몽고디비에 _id를 가져다 쓸거라서 따로 기재 안했어요 (사실 저 부분이 명확히 이해가 안가기도 했구요 ㅎㅎ;;)


// const mongoose = require("mongoose");

// const commentSchema = mongoose.Schema({
//     comment: {
//         type: String,
//         required: true,
//     },
//     userId: {
//         type: String,
//         ref: 'User',
//         required: true,
//     },
//     postId: {
//         type: String,
//     },
// });

// module.exports = mongoose.model("Comments", commentSchema);