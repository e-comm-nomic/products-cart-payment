const express = require('express');
const config = require('../Config/DB_Config');
const router = express.Router();

const connect = config.con;

//GET USERS
router.get('/', (req, res) => {
  let qr = 'SELECT * FROM users';
  connect.query(qr, (err, result) => {
    if (err || result.length == 0) {
      return res.status(400).json({
        message: 'No users found in the system',
      });
    }
    res.json(result);
  });
});


