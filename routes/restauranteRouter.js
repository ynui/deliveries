const express = require('express');
const router = express.Router();

const RestauranteUtils = require('../src/User/Restaurante/RestauranteUtils')
const UserUtils = require('../src/User/UserUtils')
const validator = require('../src/User/Restaurante/RestauranteValidator')

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
      req.customData.method = 'getRestaurantes';
    next()
  })
  .get(middleware, async (req, res, next) => {
    try {
      let allRestaurantes = await RestauranteUtils.getRestaurantes()
      res.send(allRestaurantes)
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
      let newRestaurante = await RestauranteUtils.register(req.body)
      // let token = await RestauranteUtils.getToken()
      resault = newRestaurante
      res.send(resault)
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
      let restaurante = RestauranteUtils.getRestaurante(req.params.id)
      res.send(success)
      res.end()
    } catch (error) {
      next(error)
    }
  })
  .delete(async (req, res, next) => {
    try {
      let success = await UserUtils.deleteUser(req.params.Id, 'restaurante')
      res.send(success)
      res.end()
    } catch (error) {
      next(error)
    }
  })

module.exports = router;
