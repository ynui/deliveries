const express = require('express');
const router = express.Router();

const RestaurantUtils = require('../src/Users/Restaurant/RestaurantUtils')
const UserUtils = require('../src/Users/User/UserUtils')
const validator = require('../src/Users/Restaurant/RestaurantValidator')

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
      req.customData.method = 'getRestaurants';
    next()
  })
  .get(middleware, async (req, res, next) => {
    try {
      let allRestaurants = await RestaurantUtils.getRestaurants()
      res.send(allRestaurants)
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
      let newRestaurant = await RestaurantUtils.register(req.body)
      // let token = await RestaurantUtils.getToken()
      res.send(newRestaurant)
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
      let restaurant = RestaurantUtils.getRestaurant(req.params.id)
      res.send(restaurant)
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
