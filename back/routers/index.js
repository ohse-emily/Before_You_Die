const express = require('express');
const router = express.Router();
const user = require('./user');
const msg = require('./msg');
const chat = require('./chat');

router.use('/user', user)
router.use('/msg',msg)
router.use('/chat', chat)

module.exports = router 
