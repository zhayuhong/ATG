    
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const routes = require('./routes/index')

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 7777))

// var corsOptions = {
// 	origin: 'localhost:3000',
// 	optionSuccessStatus: 200
// }

app.all('*', (req, res, next) => {
    console.log('request: ', req.body)
    return next()
})

app.use('/api', routes)

let server = app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})