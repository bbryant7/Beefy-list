const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const data = [{
    "text": "Walk dog",
    "done": true,
    id: 0
  },
  {
    "text": "Wash Car",
    "done": false,
    id: 1
  },
  {
    "text": "Buy oranges",
    "done": false,
    id: 2
  },
  {
    "text": "Call Mom",
    "done": false,
    id: 3
  },
  {
    "text": "Pay electrity bill",
    "done": true,
    id: 4
  }
]


const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json());
// only need this is if you are using json data. Example getting data back in JSON form
app.use(bodyParser.urlencoded({
  // have to have for this, to send back and forth form data between url
  extended: false
}));
//Gill doesn't know what the true and false part means. false = parses strings and arrays. true = parses nested objects. False is the default


app.get('/', function(req, res) {

  res.render('list', {
    pear: data
  });
})
// only need second part "pear: data" if you are passing data from this doc to the mustache file

app.post("/todo", function(req, res) {
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

app.post("/mac/:id", function(req, res) {
  let moveid = parseInt(req.params.id);

  for (var i = 0; i < data.length; i++) {

    if (moveid === data[i].id) {
      data[i].done = true;
    }
    console.log(data[i].id);
  }
  // console.log(move);





  res.render('list', {
    pear: data
  });
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
