const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mid = require('./middleware');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// getGeneratedHash
app.get('/api/hash', mid.getGeneratedHash, function(req, res, next) {
  res.sendStatus(400);
})

// generateHash
app.post('/api/hash', mid.hashThis, function(req, res, next) {
  res.sendStatus(200);
})
