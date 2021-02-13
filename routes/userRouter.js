const express = require('express');
const router = express.Router();

const UserUtils = require('../src/Users/User/UserUtils')
const validator = require('../src/Users/User/UserValidator')
const { setReqMethod } = require('./RouterUtils')

const middleware = [validator.validate]

router.use((req, res, next) => {
  req.customData = {
    method: null
  };
  next()
})

router.route('/')
  .all((req, res, next) => {
    setReqMethod(req, {
      get: 'getAll'
    })
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
    setReqMethod(req, {
      post: 'login'
    })
    next()
  })
  .post(middleware, async (req, res, next) => {
    try {
      let result = await UserUtils.login(req.body.email, req.body.password)
      res.send(result)
      res.end()
    } catch (error) {
      next(error)
    }
  });

router.route('/logout')
  .all((req, res, next) => {
    setReqMethod(req, {
      get: 'logout'
    })
    next()
  })
  .get(middleware, async (req, res, next) => {
    try {
      let success = await UserUtils.logout()
      res.send(success)
      res.end()
    } catch (error) {
      next(error)
    }
  });

module.exports = router;
