const express = require('express');
const app = express();
const port = 3001;
const postRouter = require("./routes/posts")
const connect = require("./schemas")

connect();

const requestMiddleware = (req, res, next) => {
    console.log("request Url : ", req.originalUrl, "-", new Date());
    next();
};

//app.use : 미들웨어를 사용할 때 쓰는 코드
app.use(express.static("static"));
app.use(requestMiddleware);
app.use(express.json());
app.use("/api", [postRouter]);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/list.html");
});

app.get("/write", (req, res) => {
    res.sendFile(__dirname + "/static/write.html");
});

app.get("/view", (req, res) => {
    res.sendFile(__dirname + "/static/view.html");
});

app.get("/edit", (req, res) => {
    res.sendFile(__dirname + "/static/edit.html");
});




// app.get('/', (req, res) => {
//     res.send('Hi')
//     //send메소드는 Ajax요청을 서버로 전달한다.
//     //send();        GET 방식
//     //send(문자열);  POST 방식
// })

app.listen(port, () => {
    console.log(port, "서버가 연결되었습니다.")
})


