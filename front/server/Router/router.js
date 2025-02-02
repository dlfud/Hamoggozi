const express = require("express");
const router = express.Router();
const request = require("request");

let list = [
  {
    subject: "안녕하세요", //글제목
    username: "podo", //작성자
    date: "2022-02-03", //날짜
  },
  {
    subject: "안녕하세요2",
    username: "podo2",
    date: "2022-02-03",
  },
  {
    subject: "안녕하세요3",
    username: "podo3",
    date: "2022-02-03",
  },
  {
    subject: "안녕하세요4",
    username: "podo4",
    date: "2022-02-03",
  },
  {
    subject: "안녕하세요5",
    username: "podo5",
    date: "2022-02-03",
  },
];

//메인창
router.get("/", (req, res) => {
  res.render("test.ejs");
});

//목록보기
router.get("/board/list", (req, res) => {
  const boardListAPI = {
    url: "http://localhost:8080/board/list",
  };

  request(boardListAPI, function (err, response, body) {
    //console.log(body[0]); // 결과 받는 것을 String으로 받음
    res.render("board_list.ejs", {
    //   data: JSON.parse(body), // json으로 변환시켜줌
      list, //라고 써도됨
    });
  });
});

module.exports = router;
