var express = require('express');
const { query } = require('../helpers/db');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  //res.send('respond with a resource');
  const users = await query('SELECT * FROM groningen_users ORDER BY pp DESC');
  res.json(users);
});

module.exports = router;
