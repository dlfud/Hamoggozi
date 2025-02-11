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

  const login = {
    url: "http://localhost:8080/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 쿠키 포함
    body: {
      id: user.id,
      pw: user.pw
    },
    json: true,
  };

  request(login, function (err, response, body) {
    console.log("body: ", body)
    if (body.code == "200") {
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
