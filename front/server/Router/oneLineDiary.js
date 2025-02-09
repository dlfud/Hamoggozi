const express = require("express");
const router = express.Router();
const request = require("request");

//목록보기
router.get("/diary/board/list", (req, res) => {
  const boardListAPI = {
    url: "http://localhost:8080/diary/getOneLineDiaryList",
  };

  request(boardListAPI, function (err, response, body) {
    console.log(JSON.parse(body)); // 결과 받는 것을 String으로 받음
    res.render("list.ejs", {
      data: JSON.parse(body), // json으로 변환시켜줌
    });
  });
});

// router.post("/board/list", (req, res) => {
//   let board = { ...req.body };
//   const boardWriteAPI = {
//     url: "http://localhost:8080/service/getOneLineDiaryList",
//     method: "POST",
//     body: {},
//     json: true,
//   };
//   request(boardWriteAPI, function (err, response, body) {
//     console.log(JSON.parse(response))
//     if (body == "success") {
//       res.json({
//         msg: "success",
//       });
//     } else {
//       console.log(err);
//     }
//   });
// });

module.exports = router;
