const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

// const app = express()

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});