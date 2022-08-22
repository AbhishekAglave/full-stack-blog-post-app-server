var express = require("express");
var router = express.Router();
const { Client } = require("pg");

const client = new Client({
  database: "blog_api",
  user: "abhishek",
  password: "abhishek",
  host: "localhost",
  port: 5432,
});

const connectClient = async () => {
  await client.connect();
};
connectClient();

router.post("/", function (req, res, next) {
  const data = req.body;
  const psqlQuery =
    "INSERT INTO users VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING *";
  client
    .query(psqlQuery, [
      data.first_name,
      data.last_name,
      data.phone,
      data.email,
      data.username,
      data.password,
    ])
    .then(() => {
      res.status(201).send({success: true, detail:"User Created Successfully"});
    })
    .catch((error) => {
      res.status(400)
      res.json(error);
    });
});

module.exports = router;
