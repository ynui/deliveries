const express = require('express');
const router = express.Router();

const CourierUtils = require('../src/Users/Courier/CourierUtils')
const UserUtils = require('../src/Users/User/UserUtils')
const validator = require('../src/Users/Courier/CourierValidator')
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
      let allCouriers = await CourierUtils.getAllCouriers()
      res.send(allCouriers)
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
      let result = await CourierUtils.login(req.body.email, req.body.password)
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
      let result = await CourierUtils.logout()
      res.send(result)
      res.end()
    } catch (error) {
      next(error)
    }
  });

router.route('/register')
  .all((req, res, next) => {
    setReqMethod(req, {
      post: 'register'
    })
    next()
  })
  .post(middleware, async (req, res, next) => {
    try {
      let newCourier = await CourierUtils.register(req.body)
      // let token = await CourierUtils.getToken()
      res.send(newCourier)
      res.end()
    } catch (error) {
      next(error)
    }
  });

router.route('/:id')
  .all((req, res, next) => {
    setReqMethod(req, {
      get: 'get',
      put: 'update',
      delete: 'delete'
    })
    next()
  })
  .get(middleware, async (req, res, next) => {
    try {
      let courier = await CourierUtils.getCourier(req.params.id)
      res.send(courier)
      res.end()
    } catch (error) {
      next(error)
    }
  })
  .put(middleware, async (req, res, next) => {
    try {
      let courier = await CourierUtils.updateProfile(req.params.id, req.body)
      res.send(courier)
      res.end()
    } catch (error) {
      next(error)
    }
  })
  .delete(middleware, async (req, res, next) => {
    try {
      let success = await UserUtils.deleteUser(req.params.Id, 'courier')
      res.send(success)
      res.end()
    } catch (error) {
      next(error)
    }
  })

module.exports = router;
