const express = require('express');
const router = express.Router()
const user = require('./user');
const msg = require('./msg')

router.use('/user', user)
router.use('/msg',msg)

module.exports = router 
