const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const validator = require('express-validator');


const app = express();

// app.engine('mustache', mustacheExpress());
// app.set('views', './views')
// app.set('view engine', 'mustache')
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(validator());

app.get('/', function (req, res) {
  res.send('Hey Beautiful! ;)');
  console.log('root runs');
})





app.listen(3000, function () {
  console.log('Successfully started express application!');
})
