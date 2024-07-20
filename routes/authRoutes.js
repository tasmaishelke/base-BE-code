const express = require('express')
const router = express.Router()
const 
{
    signUp,
    signIn,
    newAccessToken
} = require('../controllers/authControllers')

router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/signin/refresh').get(newAccessToken)

module.exports = router
