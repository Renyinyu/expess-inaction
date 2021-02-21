if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const path = require("path");

const app = express();
const PORT = 3000;

const indexRouter = require("./routes/index");

app.set("view engine", "ejs"); // 设置模板引擎
app.set("views", path.join(__dirname, "views")); // 设置视图文件夹

app.use(expressEjsLayouts);
app.use(express.static(path.join(__dirname, "public"))); // 设置资源公共路径

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database had connected"));

app.use(indexRouter);

app.listen(process.env.PORT || PORT);
