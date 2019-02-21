// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3030;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var people = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

// Displays all people
app.get("/api/people", function(req, res) {
  return res.json(people);
});

// Displays a single character, or returns false
app.get("/api/people/:people", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < people.length; i++) {
    if (chosen === people[i].routeName) {
      return res.json(people[i]);
    }
  }

  return res.json(false);
});

// Create New people - takes in JSON input
app.post("/api/people", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newPerson = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newPerson.routeName = newPerson.name.replace(/\s+/g, "").toLowerCase();

  console.log(newPerson);

  people.push(newPerson);

  res.json(newPerson);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
