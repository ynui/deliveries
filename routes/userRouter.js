const express = require('express');
const router = express.Router();

const UserUtils = require('../src/User/UserUtils')
const validator = require('../src/User/UserValidator')

const middleware = [validator.validate]

router.route('/')
  .get(middleware, async (req, res, next) => {
    try {
      let users = await UserUtils.getAllUsers()
      res.send(users)
      res.end()
    } catch (error) {
      next(error)
    }
  });

module.exports = router;
