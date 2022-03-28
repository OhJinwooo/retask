// const jwt = require("jsonwebtoken");
// const User = require("../schemas/user");


// //HTTP`Authorization: Bearer JWT토큰내용`
// //위와 같은 양식으로 보내는 이유는 [HTTP 인증](https://developer.mozilla.org/ko/docs/Web/HTTP/Authentication) 유형중, Bearer 타입을 사용하여 토큰을 전달하기 위함입니다.
// //"Authorization" 헤더로 전달받는 토큰이 유효한지 검사하고, 만약 유효하다면 토큰 안에 있는 userId 데이터로 해당 사용자가 데이터베이스에 실제로 존재하는지 체크하면 됩니다.
// module.exports = (req, res, next) => {
//     const { authorization } = req.headers;
//     const [ tokenType, tokenValue ] = authorization.split(' ');

//     if(tokenType !== 'Bearer') {
//         res.status(401).send({
//             errorMessage: '로그인 후 사용하세요'
//         });
//         return;
//     }
//     try {
//         const {userId} = jwt.verify(tokenValue, "")
//     }
// }