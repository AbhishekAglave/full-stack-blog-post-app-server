var express = require("express");
var router = express.Router();
const { Client } = require("pg");

const client = new Client({
  host: "ec2-44-205-63-142.compute-1.amazonaws.com",
  database: "deqh2c85kh2fjv",
  user: "kqgqsgylzecplg",
  password: "52bd01df55c3d4f6eaebd31ed5a17fec933079e8fe434c82587045d599db42f3",
  port: 5432,
  // connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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
