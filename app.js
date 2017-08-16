const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const data = [{
    "text": "Walk dog",
    "done": true,
    id: "1"
  },
  {
    "text": "Wash Car",
    "done": false,
    id: "2"
  },
  {
    "text": "Buy oranges",
    "done": false,
    id: "3"
  },
  {
    "text": "Call Mom",
    "done": false,
    id: "4"
  },
  {
    "text": "Pay electrity bill",
    "done": true,
    id: "5"
  }
]


const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.get('/', function(req, res) {

  res.render('list', {
    pear: data
  });
})

app.post("/", function(req, res) {
  let add = req.body.newtodo;
  let max = 0;
  for (var i = 0; i < data.length; i++) {
    if (max < data[i].id) {
      max = data[i].id
    }
  }

  let todo = {
    "text": add,
    "done": false,
    id: max + 1
  };
  data.push(todo);


  res.redirect('/');
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
