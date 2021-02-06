const express = require('express');
const router = express.Router();

const RestaurantUtils = require('../src/Users/Restaurant/RestaurantUtils')
const UserUtils = require('../src/Users/User/UserUtils')
const validator = require('../src/Users/Restaurant/RestaurantValidator')
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
      let allRestaurants = await RestaurantUtils.getAllRestaurants()
      res.send(allRestaurants)
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
      let resault = await RestaurantUtils.login(req.body.email, req.body.password)
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
      let resault = await RestaurantUtils.logout()
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
      let newRestaurant = await RestaurantUtils.register(req.body)
      // let token = await RestaurantUtils.getToken()
      res.send(newRestaurant)
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
  .get(async (req, res, next) => {
    try {
      let restaurant = await RestaurantUtils.getRestaurant(req.params.id)
      res.send(restaurant)
      res.end()
    } catch (error) {
      next(error)
    }
  })
  .put(middleware, async (req, res, next) => {
    try {
      let courier = await RestaurantUtils.updateProfile(req.params.id, req.body)
      res.send(courier)
      res.end()
    } catch (error) {
      next(error)
    }
  })
  .delete(async (req, res, next) => {
    try {
      let success = await UserUtils.deleteUser(req.params.Id, 'restaurant')
      res.send(success)
      res.end()
    } catch (error) {
      next(error)
    }
  })

module.exports = router;
