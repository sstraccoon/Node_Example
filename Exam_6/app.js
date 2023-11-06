const express = require("express"); //express 서버 만드는 미들웨어
const morgan = require("morgan"); //morgan 연결 후 접속하면 기존 로그 외에 추가적인 로그를 볼 수 있다.
const cookieParser = require("cookie-parser"); //요청에 동봉된 쿠키를 해석해 req.cookies 객체로 든다, 쿠키 관련 미들웨어
const session = require("express-session"); // 세션 관리용 미들웨어, 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 유용 req.session 객체 안에 유지
const dotenv = require("dotenv"); //env 파일을 읽을 수 있다.
const path = require("path"); //path

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);
app.use((req, res, next) => {
  console.log("모든 요청에 다 실행됩니다.");
  next();
});
