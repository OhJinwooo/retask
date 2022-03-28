const express = require("express");
const Post = require("../schemas/post")
const router = express.Router();
const CryptoJS = require("crypto-js")

router.get("/", (req, res, next) => {
    console.log("미들웨어가 작동합니다.")
    res.send('list page')

});

//view.html 상세 조회 페이지
router.get("/post", async (req, res) => {
    const post = await Post.find();
    res.json({
        post,
    });
});

//Id값 가져와서 상세조회하기
router.get("/post/:postId", async (req, res) => {
    const { postId } = req.params;

    const [ view ] = await Post.findById({ postId: Number(postId) });
    res.json({
        view,
    });
});

//write.html 게시글 작성
router.post("/post/write" , async (req, res) => {
    const today = new Date();
    const date = today.toLocaleString();
    const { title, writer, description, pw } = req.body;
    console.log(req.body)
    let hash = CryptoJS.SHA256(date);
    const postId = hash["words"][0];

    const createdPosts = await Post.create({ postId, writer,  title, description, pw, date, });
    res.json({ post: createdPosts });
});




module.exports = router;