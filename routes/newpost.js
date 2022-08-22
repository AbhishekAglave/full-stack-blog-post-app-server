const express = require("express");
const router = express.Router();
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

router.get("/", (req, res) => {
    
});
  
module.exports = router;
  