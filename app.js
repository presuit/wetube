// 어떤 api를 import 하는 과정에서 from 앞에 있는 단어는 내가 정할 수 있는 단어이다. like expressMyass 처럼 하지만 from 뒤에 있는 단어는
// js가 내 파일 디렉토리에서 api를 찾는 중요 파일명이기 때문에 이 부분은 함부로 내가 바꿀수 없는 부분이다.
import expressMyass from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";
const app = expressMyass();

const handleHome = (req, res) => res.send("Hello from Home Thxs nodemon");
const handleProfile = (req, res) => res.send("You're on my profile");

// middleware practice
// use 메소드로 쓴 녀석들이 다 실행되고 나서야 route가 가능하다. 즉 미들웨어로 쿠키파서, 보디파서, 헬멧, 모건을 설치한 것이다.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true}) );
app.use(helmet());
app.use(morgan("dev"));

// routing
app.get("/", handleHome);
app.get("/profile", handleProfile);
// use를 쓴 이유는 /user에 접근하면 userRouter를 쓰겠다는 뜻이기 때문이다. 
// 그리고 usesrRouter에는 여러가지 get메소드로 정의한 라우팅 장소가 존재하기 때문에 이들을 모두 접근 가능하다. 즉 /user/, /user/edit, /user/password 등등
app.use("/user", userRouter);

export default app;