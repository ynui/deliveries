const express = require('express');
const router = express.Router();

const UserUtils = require('../src/Users/User/UserUtils')
const validator = require('../src/Users/User/UserValidator')

const middleware = [validator.validate]

router.use((req, res, next) => {
  req.customData = {
    method: null
  };
  next()
})

router.route('/')
  .all((req, res, next) => {
    if (req.method === 'GET')
      req.customData.method = 'getUsers';
    next()
  })
  .get(middleware, async (req, res, next) => {
    try {
      let users = await UserUtils.getAllUsers()
      res.send(users)
      res.end()
    } catch (error) {
      next(error)
    }
  });

router.route('/login')
  .all((req, res, next) => {
    if (req.method === 'GET')
      req.customData.method = 'login';
    next()
  })
  .get(middleware, async (req, res, next) => {
    try {
      let users = await UserUtils.login(req.body.email, req.body.password)
      res.send(users)
      res.end()
    } catch (error) {
      next(error)
    }
  });

module.exports = router;
