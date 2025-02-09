const express = require("express");
const app = express();
const general = require("./Router/general");
const oneLineDiary = require("./Router/oneLineDiary");

app.set("views", __dirname + "/Views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", general); // '/' 경로로 들어오는 요청 처리
app.use("/diary", oneLineDiary); // '/diary' 경로로 들어오는 요청 처리

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});