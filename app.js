const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const app = express();
let database;
const url = 'mongodb://localhost:27017/todo';

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

// db is a reference to the mongo db, we named it database in the boilerplate code, so it needs to be database; saved it off in the local  variable "database"

app.get('/', function(req, res) {
  let collection = database.collection('todos');
  // Find some documents
    collection.find({}).toArray(function(err, todo) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(todo)
    res.render('list', {pear: todo});
  });
})
// only need second part "pear: data" if you are passing data from this doc to the mustache file

app.post("/todo", function(req, res) {
  console.log('post to /todo')
  let add = req.body.newtodo;
  // let max = 0;
  // for (var i = 0; i < todo.length; i++) {
  //   if (max < todo[i].id) {
  //     max = todo[i].id
  //   }
  // }

  let todo2 = {
    "text": add,
    "done": false,
    // id: max + 1
  };

  let collection = database.collection('todos');
  // Find some documents
    collection.insertOne(todo2,function(err, todo) {
    // assert.equal(err, null);
    console.log("added new to");
    console.log("theobject", todo)


  res.redirect('/');
});
})

app.post("/mac/:id", function(req, res) {
  let moveid = parseInt(req.params.id);

  for (var i = 0; i < todo.length; i++) {

    if (moveid === todo[i].id) {
      todo[i].done = true;
    }
    console.log(todo[i].id);
  }
  // console.log(move);





  res.render('list', {
    pear: todo
  });
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})




MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb");
  database = db;
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  database.close(function () {
    console.log('mongodb disconnected on app termination');
    process.exit(0);
  });
});
