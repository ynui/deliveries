var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.route('/register')
  .post(middleware, async (req, res, next) => {
    try {
      let newUser = await userUtils.registerUser(req.body)
      let writeDetails = await userUtils.wriewUserDetails(newUser)
      let token = await userUtils.getToken()
      let verificationEmail = userUtils.sendVerificationEmail(newUser)
      resault = {
        token: token,
        user: newUser
      }
      res.send(resault)
      res.end()
    } catch (error) {
      next(error)
    }
  });

module.exports = router;
