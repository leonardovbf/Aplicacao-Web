var express = require('express');
var postgres = require('postgres');
const htmlController = require('./controllers/htmlController');

var port = 3000;

var app = express();

// var sql = postgres('postgres://username:password@host:port/database', {
//     host: '',
//     port: 5432,
//     database: '',
//     username: '',
//     password: '',
// })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.unsubscribe('/assets', express.static(__dirname + '/public'))

app.set('view engine', 'ejs')

app.use('/', (req, res, next) => {
    console.log('Resquest URL:', req.url)
    next()
})


htmlController(app)

app.listen(port, '0.0.0.0')