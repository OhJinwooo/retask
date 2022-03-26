const express = require("express");
const Post = require("../schemas/post")
const router = express.Router();
const CryptoJS = require("crypto-js")

router.get("/", (req, res, next) => {
    console.log("미들웨어가 작동합니다.")
    res.send('list page')

});

router.get("/post", async (req, res) => {
    const post = await Post.find();
    res.json({
        post,
    });
});

router.post("/post/write" , async (req, res) => {
    const today = new Date();
    const date = today.toLocaleString();
    const { title, writer, description, pw } = req.body;
    console.log(body)
    let hash = CryptoJS.SHA256(date);
    const postId = hash["words"][0];

    const createdPosts = await Posts.create({ postId, writer,  title, description, pw, date, });
    res.json({ post: createdPosts });
});




module.exports = router;