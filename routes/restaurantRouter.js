const express = require('express');
const router = express.Router();

const { setReqMethod } = require('./RouterUtils')
const RestaurantUtils = require('../src/Users/Restaurant/RestaurantUtils')
const UserUtils = require('../src/Users/User/UserUtils')
const validator = require('../src/Users/Restaurant/RestaurantValidator')
const geo = require('../src/Geocoding/geocode')

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
      let allRestaurants = await RestaurantUtils.getAllRestaurants()
      res.send(allRestaurants)
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
      let result = await RestaurantUtils.login(req.body.email, req.body.password)
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
      let result = await RestaurantUtils.logout()
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
    setReqMethod(req, {
      get: 'get',
      put: 'update',
      delete: 'delete',
    })
    next()
  })
  .get(middleware, async (req, res, next) => {
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
  .delete(middleware, async (req, res, next) => {
    try {
      let success = await UserUtils.deleteUser(req.params.id, 'restaurant')
      res.send(success)
      res.end()
    } catch (error) {
      next(error)
    }
  })

router.route('/:id/getQuote')
  .all((req, res, next) => {
    setReqMethod(req, {
      post: 'getQuote'
    })
    next()
  })
  .post(middleware, async (req, res, next) => {
    try {
      let result = await RestaurantUtils.getQuote(req.params.id, req.body)
      res.send(result)
      res.end()
    } catch (error) {
      next(error)
    }
  })

module.exports = router;
