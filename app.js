const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { Client } = require("pg");
// const fs = require("fs");
// const pg = require("pg");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const signupRouter = require("./routes/signup");
const newpostRouter = require("./routes/newpost");

const app = express();
app.use(cors());
// view engine setup

// const client = new Client({
//   database: "blog_api",
//   user: "abhishek",
//   password: "abhishek",
//   host: "localhost",
//   port: 5432,
// });

const client = new Client({
  host: "ec2-44-205-63-142.compute-1.amazonaws.com",
  database: "deqh2c85kh2fjv",
  user: "kqgqsgylzecplg",
  password: "52bd01df55c3d4f6eaebd31ed5a17fec933079e8fe434c82587045d599db42f3",
  port: 5432,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTable() {
  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT,
      phone VARCHAR(15) UNIQUE,
      email TEXT UNIQUE,
      username TEXT NOT NULL UNIQUE,
      password VARCHAR(30) NOT NULL
    );
  `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS posts(
      id SERIAL PRIMARY KEY,
      username TEXT,
      title TEXT,
      thumbnail TEXT,
      description TEXT,
      date DATE,
      time TIME,
      article VARCHAR
    );
  `);
}
createTable();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/signup", signupRouter);
app.use("/newpost", newpostRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
