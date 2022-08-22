const express = require("express");
const router = express.Router();
const { Client } = require("pg");

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

const connectClient = async () => {
  await client.connect();
};
connectClient();

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.url.includes("id=")) {
    const id = req.query.id;
    const query = `SELECT * FROM posts WHERE id=${id}`;
    client.query(query).then((result) => {
      res.json(result.rows);
    });
  } else {
    client.query("SELECT * FROM posts").then((result) => {
      res.json(result.rows);
    });
  }
});

router.get("/:username", function (req, res, next) {
  const username = req.params.username;
  const query = "SELECT * FROM posts WHERE username= $1";
  client.query(query, [username]).then((result) => {
    res.json(result.rows);
  });
});

module.exports = router;
