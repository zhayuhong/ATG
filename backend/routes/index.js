const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const request = require('request')
var multer = require('multer')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlpwd_1A',
  database: 'ticket_record'
})

router.post('/search', (req, res, next) => {
  connection.connect()
  connection.query('SELECT * from records', function (err, rows, fields) {
    if (err) throw err

    var string = JSON.stringify(rows)
    var data = JSON.parse(string)
    console.log(data);
    res.status(200).json({ "result": data })
  })
  connection.end()
})

router.post('/high', (req, res, next) => {
  connection.connect()
  connection.query("SELECT * from records where severity = 'high'", function (err, rows, fields) {
    if (err) throw err

    var string = JSON.stringify(rows)
    var data = JSON.parse(string)
    console.log(data);
    res.status(200).json({ "result": data })
  })
  connection.end()
})

router.post('/minimal', (req, res, next) => {
  connection.connect()
  connection.query("SELECT * from records where severity = 'minimal'", function (err, rows, fields) {
    if (err) throw err

    var string = JSON.stringify(rows)
    var data = JSON.parse(string)
    console.log(data);
    res.status(200).json({ "result": data })
  })
  connection.end()
})

router.post('/low', (req, res, next) => {
  connection.connect()
  connection.query("SELECT * from records where severity = 'low'", function (err, rows, fields) {
    if (err) throw err

    var string = JSON.stringify(rows)
    var data = JSON.parse(string)
    console.log(data);
    res.status(200).json({ "result": data })
  })
  connection.end()
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var savefile = multer({ storage: storage }).single('file')
router.post('/save', function (req, res) {
  console.log("save")
  savefile(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).json({ "file_name": "public/" + req.file.originalname })

  })
});

router.post('/upload', (req, res, next) => {
  console.log('reading CSV data from csv:')
  var file_name = req.query.file_name
  var ticket_name = req.query.ticket_name
  // var application_name = req.query.application_name
  var team_name = req.query.team_name

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  var submission_date = mm + '/' + dd + '/' + yyyy;

  // import file system library:
  var fs = require('fs')
  // import csv parsing library
  var csvParse = require('csv-parse/lib/sync')
  // read the csv file to a string
  var fileContents = fs.readFileSync(file_name, 'utf-8')
  // parse the csv file
  var csvData = csvParse(fileContents)
  // for each row of data
  var line_num = 0
  connection.connect()
  var sql = "INSERT INTO records(issue_type, vulnerability_id, vulnerability_url, summary, description, severity, impact, recommendation, team_name, ticket_name, file_name, submission_date) VALUES "
  var last_summary = ""
  var vnl_url = ""
  for (var row of csvData) {
    line_num++;
    if (line_num == 1) {
      continue
    }
    var tar = "("
    var this_summary = row[3].replace(/'/g, "")
    for (col in row) {
      console.log(col)
      tar += "'" + row[col].replace(/'/g, "") + "',"
    }
    tar += "'" + team_name.replace(/'/g, "") + "',"
    tar += "'" + ticket_name.replace(/'/g, "") + "',"
    tar += "'" + file_name.replace(/'/g, "") + "',"
    tar += "'" + submission_date.replace(/'/g, "") + "',"
    tar = tar.slice(0, -1) + ")"
    // console.log(tar)
    connection.query(sql + tar, function (err, result) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
      }

      console.log('--------------------------INSERT----------------------------');
      //console.log('INSERT ID:',result.insertId);        
      console.log('INSERT ID:', result);
      console.log('-----------------------------------------------------------------\n\n');
    });
  }

  connection.end()
  res.status(200).json({ "file_name": file_name })
})
module.exports = router