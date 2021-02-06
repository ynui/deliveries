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
    setReqMethod(req, new Map([
      ['GET', 'getAll']
    ]))
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
    setReqMethod(req, new Map([
      ['POST', 'login']
    ]))
    next()
  })
  .post(middleware, async (req, res, next) => {
    try {
      let resault = await CourierUtils.login(req.body.email, req.body.password)
      res.send(resault)
      res.end()
    } catch (error) {
      next(error)
    }
  });

router.route('/logout')
  .all((req, res, next) => {
    setReqMethod(req, new Map([
      ['GET', 'logout']
    ]))
    next()
  })
  .get(middleware, async (req, res, next) => {
    try {
      let resault = await CourierUtils.logout()
      res.send(resault)
      res.end()
    } catch (error) {
      next(error)
    }
  });

router.route('/register')
  .all((req, res, next) => {
    setReqMethod(req, new Map([
      ['POST', 'register']
    ]))
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
    setReqMethod(req, new Map([
      ['GET', 'get'],
      ['PUT', 'update'],
      ['DELETE', 'delete'],
    ]))
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
