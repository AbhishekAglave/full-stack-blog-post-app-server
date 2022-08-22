var express = require('express');
var router = express.Router();
const { Client } = require("pg");

const client = new Client({
  database: "blog_api",
  user: "abhishek",
  password: "abhishek",
  host: "localhost",
  port: 5432,
});

const connectClient = async() =>{
    await client.connect();
}
connectClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.url.includes("id=")){
    const id = req.query.id;
    const query = `SELECT * FROM users WHERE id=${id}`
    client.query(query).then((result) => {
      res.json(result.rows);
    });
  }else{
    client.query("SELECT * FROM users").then((result) => {
      res.json(result.rows);
    });
  }
});

module.exports = router;
