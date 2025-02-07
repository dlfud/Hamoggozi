const express = require("express");
const router = express.Router();
const request = require("request");

//메인창
router.get("/", (req, res) => {
  res.render("test.ejs");
});

// //목록보기
// router.get("/board/list", (req, res) => {
//   const boardListAPI = {
//     url: "http://localhost:8080/service/getOneLineDiaryList",
//   };

//   request(boardListAPI, function (err, response, body) {
//     console.log(JSON.parse(body)); // 결과 받는 것을 String으로 받음
//   });
// });

router.post("/board/list", (req, res) => {
  let board = { ...req.body };
  const boardWriteAPI = {
    url: "http://localhost:8080/service/getOneLineDiaryList",
    method: "POST",
    body: {},
    json: true,
  };
  request(boardWriteAPI, function (err, response, body) {
    console.log(JSON.parse(response))
    if (body == "success") {
      res.json({
        msg: "success",
      });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
