module.exports = function(app) {
  var express = require('express');
  var router = express.Router();
  var jwt = require('jsonwebtoken');

  var user = {
    email: 'test@test.com',
    password: 'secret'
  };

  router.post('/', function(req, res) {
    if (req.body.email === user.email && req.body.password === user.password) {
      var token;

      token = jwt.sign({ email: user.email }, 'secretkey');

      res.send({
        token: token
      });
    } else {
      res.status(401).end();
    }
  });

  app.use('/api/tokens', router);
};
