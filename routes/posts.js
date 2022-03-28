
const express = require("express");
const connect = require("../schemas")
const Post = require("../schemas/post");
const User = require("../schemas/user");
const router = express.Router();
const CryptoJS = require("crypto-js");

connect();




router.get("/", (req, res) => {
    console.log("미들웨어가 작동합니다.")
    res.send('list page')
});

//회원가입
router.post("/users", async (req, res) => {
    const { nickname, id, password, confirmPassword } = req.body;
    console.log(password,confirmPassword)
    
    if (password !== confirmPassword) {//패스워드와 패스워드 확인란과 같지 않을 때 에러메세지를 띄워라
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.'
        });
        return;
    }

    const existUsers = await User.find({//변수 User값 안에 (find찾는 함수) id, nickname을 찾는다. 
        $or: [{id}, {nickname}],//변수 User값 안에 id와 nickname이 둘중 or 연산자를 사용하여 하나라도 같은 값이 있을 때
    });
    if (existUsers.length) {
        res.status(400).send({//에러 메세지를 띄워준다.
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.'
        });
        return;
    }


    const user = new User({ id, nickname, password });
    await user.save();

    res.status(201).send({})//응답값을 줄 필요가 없다. 프론트엔드에서 회원 가입을 하고 나서 API가 주는 응답값으로 뭔가 하는게 아무것도 없다
})






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


