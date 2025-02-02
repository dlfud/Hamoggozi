const express = require("express");
const app = express();
const router = require("./Router/router");

app.set("views", __dirname + "/Views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});