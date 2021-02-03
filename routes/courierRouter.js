const express = require('express');
const router = express.Router();

const CourierUtils = require('../src/Users/Courier/CourierUtils')
const UserUtils = require('../src/Users/User/UserUtils')
const validator = require('../src/Users/Courier/CourierValidator')

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
      req.customData.method = 'getCouriers';
    next()
  })
  .get(middleware, async (req, res, next) => {
    try {
      let allCouriers = await CourierUtils.getCouriers()
      res.send(allCouriers)
      res.end()
    } catch (error) {
      next(error)
    }
  });

router.route('/register')
  .all((req, res, next) => {
    if (req.method === 'POST')
      req.customData.method = 'register';
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

router.route('/:Id')
  .all((req, res, next) => {
    // if (req.method === 'POST')
    // req.customData.method = 'register';
    next()
  })
  .get(async (req, res, next) => {
    try {
      let courier = CourierUtils.getCourier(req.params.id)
      res.send(courier)
      res.end()
    } catch (error) {
      next(error)
    }
  })
  .delete(async (req, res, next) => {
    try {
      let success = await UserUtils.deleteUser(req.params.Id, 'courier')
      res.send(success)
      res.end()
    } catch (error) {
      next(error)
    }
  })

module.exports = router;
