
const express = require("express");
const connect = require("../schemas")
const Post = require("../schemas/post");
const User = require("../schemas/user");
const Comment = require("../schemas/comment")
const router = express.Router();
const Jwt = require('jsonwebtoken')//jwt (소문자로..)
const authMiddleware = require("../middleswares/auth-middleware")


connect();


router.get("/", (req, res) => {
    console.log("미들웨어가 작동합니다.")
    res.send('list page')
});

//회원가입
router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {//패스워드와 패스워드 확인란과 같지 않을 때 에러메세지를 띄워라
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.'
        });
        return;
    }

    const existUsers = await User.find({//변수 User값 안에 (find찾는 함수) id, nickname을 찾는다. 
        $or: [{nickname}],//변수 User값 안에 id와 nickname이 둘중 or 연산자를 사용하여 하나라도 같은 값이 있을 때
    });
    if (existUsers.length) {
        res.status(400).send({//에러 메세지를 띄워준다.
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.'
        });
        return;
    }


    const user = new User({ nickname, password });
    await user.save();

    res.status(201).send({})//응답값을 줄 필요가 없다. 프론트엔드에서 회원 가입을 하고 나서 API가 주는 응답값으로 뭔가 하는게 아무것도 없다
})

//로그인
//auth(authentication): 로그인 한다는 행위가 내 권한을 인증한다는 행위로 빗대어 하는게 보통의 관례 JWT토큰
//POST메서드를 사용하는 이유는 토큰을 그때 그때 생성을 하기 때문에 또 다른 장점은 GET같은 메서드는 바디에 실을 수 없고 다른곳에 해야되는데 그럼 주소에 다 노출이 된다 
//그럼 보안에 취약하기 때문에 로그인은 POST메서드로 구현하는게 좋다
router.post("/auth", async (req, res) => {
    const { nickname, password } = req.body;
    console.log(nickname,password)
    const user = await User.findOne({ nickname, password}).exec();

    if(!user) {
        res.status(400).send({
            errorMessage: '닉네임 또는 패스워드를 확인해주세요.'
        })
        return;
    }//jwt (소문자로..)
    const token = Jwt.sign({ userid: user.userId}, "m-s-k-j-w"); //userId 대문자로..
    res.send({
        token,
    })

});

router.get("/users/me", authMiddleware, async (req, res) => {
    console.log(res.locals);
    const { user } = res.locals;
      res.send({
          user,
      });
});



router.get("/post", async (req, res) => {
    const post = await Post.find();
    res.json({ post });
});

//write.html 게시글 작성
router.post("/post/write", async (req, res) => {
    const today = new Date();
    const date = today.toLocaleString();
    const { title, writer, description, pw } = req.body;
    console.log(req.body)

    const createdPosts = await Post.create({ writer,  title, description, pw, date, });
    res.json({ post: createdPosts });
});


// Id값 가져와서 상세조회하기
router.get("/post/:postid", async (req, res) => {
    const { postid } = req.params;
    console.log(postid)
    const [ view ] = await Post.find({_id: postid}).exec();
    // const comment  = await Comment.find({})
    res.json({
        view,
    });
    console.log(view)
});

//comment 작성 POST
router.post("/posts/:postid", authMiddleware, async (req, res) => {
    const { postid } = req.params;
    // const userId = res.locals.user._id;
    console.log(res.locals.user)
    const { comment } = req.body;
    const createcomments = await Comment.create({ comment, postid })
    res.json({ msg: '등록완료' })
})

//comment 작성 GET
// router.get("/posts/:commentid", async (req, res) => {
//     const { commentid } = req.params;
//     const { comment } = req.body
//     console.log(commentid)
//     const [ commentId ] = await Comment.find({commentid: commentid}).exec();
//     const [ comments ] = await Comment.find({ comment })
//     res.json({
//         commentId,
//         comments,
//     })
// });




module.exports = router;


