const express = require("express");
const router = express.Router();
const request = require("request");

//
router.get("/", (req, res) => {
  res.render("login.ejs");
});

//login
router.post("/login", (req, res) => {
  let user = { ...req.body };

  const boardWriteAPI = {
    url: "http://localhost:8080/login",
    method: "POST",
    body: {
      id: user.id,
      pw: user.pw
    },
    json: true,
  };

  request(boardWriteAPI, function (err, response, body) {
    console.log(body)
    if (body == "success") {
      res.json({
        msg: "success",
      });
    } else {
      console.log(err);
    }
  });
})

//main
router.get("/main", (req, res) => {
  res.render("main.ejs");
});

module.exports = router;
