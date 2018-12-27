var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var obj = {
  password: '',
  saltRound: 4,
  hash: 'hello'
};
var result = false;

// Middelware

// hashThis
function hashThis(req, res, next) {
  const saltRound = parseInt(req.body.saltRound);
  const password = req.body.password;

  console.log('Salt Rounds: ' + saltRound);
  console.log('Before hash: ' + password);

  bcrypt.hash(password, saltRound, function(err, hash) {
    console.log('After hash: ' + hash);
    obj.password = password;
    obj.saltRound = saltRound;
    obj.hash = hash;
  });
  return next();
}

// getGeneratedHash
function getGeneratedHash(req, res, next) {
  if (req) {
    res.json(obj.hash);
  } else {
    return next();
  }
}

// postComparison
function postComparison(req, res, next) {
  if (req) {
    res.json(result);
  } else {
    return next();
  }
}
// getResult
function getResult(req, res, next) {
  // Declare constants
  const password = req.body.password;
  const hash = req.body.hash;

  console.log('Password: ' + password);
  console.log('Hash: ' + hash);

  bcrypt.compare(password, hash, function(err, res) {
    if (res === true) {
      console.log('True');
      return result = true;
    } else {
      console.log('False');
      return result = false;
    }
  });
  return next();
}


module.exports.hashThis = hashThis;
module.exports.getGeneratedHash = getGeneratedHash;
module.exports.postComparison = postComparison;
module.exports.getResult = getResult;
